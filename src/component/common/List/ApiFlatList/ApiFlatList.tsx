/********************************************************************************************************************
 * API 기본 리스트 컴포넌트
 * ******************************************************************************************************************/

import React, {useRef} from 'react';
import {FlatList, LayoutChangeEvent, ListRenderItemInfo, RefreshControl, unstable_batchedUpdates} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useAppState} from '@context';
import {LoadingStatus} from '@const';
import {ScrollViewProps} from '../../View/ScrollView';
import {ApiFlatListProps as Props, ApiFlatListItem, ApiFlatListCommands} from './ApiFlatList.types';

function ApiFlatList<T extends ApiFlatListItem>({
  animated,
  perPageListItemCount,
  loadDelay = 500,
  emptyText,
  emptyMinHeight,
  errorDelay = 500,
  parentHeight,
  keyboardDismissMode,
  keyboardShouldPersistTaps,
  reloadListWhenActiveFromBackground,
  reloadListWhenActiveFromLongTermDeActive,
  ListHeaderComponent: InitListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent: InitListEmptyComponent,
  disableRefresh,
  onLoadList,
  onLayout,
  onList,
  renderLoading,
  onEndReachedThreshold = 1,
  onChangeLoadingStatus,
  onCommands,
  onReloadWhenActiveFromBackground,
  onReloadWhenActiveFromLongTermDeActive,
  onRefresh,
  onEmptyComponent,
  ...props
}: Props<T>) {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {appState} = useAppState();
  const activeScreen = useIsFocused();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const isActiveRef = useRef(false);
  const flatListRef = useRef<FlatList>(null);
  const inactiveTimeRef = useRef(0);
  const lastLoadTimeRef = useRef(0);
  const contentHeightRef = useRef(0);
  const loadNextWheLoadComplete = useRef(false);
  const loadingStatusRef = useRef<LoadingStatus>(Const.LoadingStatus.FirstLoading);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [lastAppState, setLastAppState] = useState(appState);
  const [lastActiveScreen, setLastActiveScreen] = useState(activeScreen);

  const [listHeaderHeight, setListHeaderHeight] = useState(0);
  const [flatListHeight, setFlatListHeight] = useState<number>();
  const [loadingStatus, _setLoadingStatus] = useState<LoadingStatus>(Const.LoadingStatus.FirstLoading);
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<T[]>();
  const [emptyHeight, setEmptyHeight] = useState(0);
  const [errorHeight, setErrorHeight] = useState(0);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    setLastAppState(appState);
  }, [appState]);

  useEffect(() => {
    setLastActiveScreen(activeScreen);
  }, [activeScreen]);

  useEffect(() => {
    if (appState !== 'active' || !activeScreen) {
      inactiveTimeRef.current = new Date().getTime();
    }
  }, [appState, activeScreen]);

  useEffect(() => {
    if (reloadListWhenActiveFromBackground && lastAppState === 'background' && appState === 'active') {
      setList(undefined);
      loadRefreshList();
      onReloadWhenActiveFromBackground?.();
    } else if (
      reloadListWhenActiveFromLongTermDeActive &&
      ((lastAppState === 'background' && appState === 'active') || (!lastActiveScreen && activeScreen))
    ) {
      if (new Date().getTime() - inactiveTimeRef.current > app.RefreshTime) {
        setList(undefined);
        loadRefreshList();
        onReloadWhenActiveFromLongTermDeActive?.();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState, activeScreen, lastAppState, lastActiveScreen]);

  useEffect(() => {
    if (list === undefined) {
      flatListRef.current?.scrollToOffset({offset: 0, animated: false});
    }
  }, [list]);

  useEffect(() => {
    onList?.(list, loadingStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, loadingStatus]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const isLoading = useMemo(() => LoadingStatus.isLoading(loadingStatus), [loadingStatus]);

  const isFirstLoading = useMemo(() => loadingStatus === Const.LoadingStatus.FirstLoading, [loadingStatus]);

  const isFirstOrRefreshLoading = useMemo(
    () => Const.LoadingStatus.isFirstOrRefreshLoading(loadingStatus),
    [loadingStatus],
  );

  const isNextLoading = useMemo(() => loadingStatus === Const.LoadingStatus.NextLoading, [loadingStatus]);

  const isRefreshLoading = useMemo(() => loadingStatus === Const.LoadingStatus.RefreshLoading, [loadingStatus]);

  const isFirstError = useMemo(() => loadingStatus === Const.LoadingStatus.FirstError, [loadingStatus]);

  const isComplete = useMemo(() => loadingStatus === Const.LoadingStatus.Complete, [loadingStatus]);

  const isEmpty = useMemo(() => loadingStatus === Const.LoadingStatus.Empty, [loadingStatus]);

  useEffect(() => {
    if (LoadingStatus.isSuccess(loadingStatus) || loadingStatus === LoadingStatus.Empty) {
      lastLoadTimeRef.current = nowTime();
      nextTick(() => {
        lastLoadTimeRef.current = nowTime();
      });
    }
  }, [list, loadingStatus]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  useEffect(() => {
    onChangeLoadingStatus?.(loadingStatus);

    switch (loadingStatus) {
      case Const.LoadingStatus.FirstLoading:
      case Const.LoadingStatus.RefreshLoading:
        loadList();
        break;
      case Const.LoadingStatus.NextLoading:
        loadList(list && list.length > 0 ? list[list.length - 1].id : undefined);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingStatus]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const changeLoadingStatus = useCallback((newLoadingStatus: LoadingStatus) => {
    loadingStatusRef.current = newLoadingStatus;
    _setLoadingStatus(newLoadingStatus);
  }, []);

  const loadList = useCallback(
    (lastId?: string | number) => {
      if (!Const.LoadingStatus.isLoading(loadingStatus)) {
        return;
      }

      onLoadList(lastId, list?.length || 0, loadingStatus)
        .then((newList) => {
          const apply = () => {
            unstable_batchedUpdates(() => {
              lastLoadTimeRef.current = nowTime();
              setList(
                loadingStatus === Const.LoadingStatus.NextLoading
                  ? (old) => (old ? [...old, ...newList] : newList)
                  : newList,
              );

              const newLoadingStatus =
                isFirstOrRefreshLoading && newList.length === 0
                  ? Const.LoadingStatus.Empty
                  : newList.length < perPageListItemCount
                  ? Const.LoadingStatus.Complete
                  : Const.LoadingStatus.getSuccess(loadingStatus);

              setRefreshing(false);

              if (loadNextWheLoadComplete.current) {
                loadNextWheLoadComplete.current = false;
                if (!contains([Const.LoadingStatus.Empty, Const.LoadingStatus.Complete], newLoadingStatus)) {
                  changeLoadingStatus(newLoadingStatus);
                  nextTick(() => {
                    changeLoadingStatus(Const.LoadingStatus.NextLoading);
                  });
                } else {
                  changeLoadingStatus(newLoadingStatus);
                }
              } else {
                changeLoadingStatus(newLoadingStatus);
              }
            });
          };

          if (isFirstOrRefreshLoading) {
            delayTimeout(() => {
              apply();
            }, ifUndefined(loadDelay, 0));
          } else {
            apply();
          }
        })
        .catch(() => {
          delayTimeout(() => {
            unstable_batchedUpdates(() => {
              changeLoadingStatus(Const.LoadingStatus.getError(loadingStatus));
              setRefreshing(false);
            });
          }, ifUndefined(errorDelay, 0));
        });
    },
    [
      changeLoadingStatus,
      errorDelay,
      isFirstOrRefreshLoading,
      list?.length,
      loadDelay,
      loadingStatus,
      onLoadList,
      perPageListItemCount,
    ],
  );

  const loadNextList = useCallback(() => {
    if (
      !Const.LoadingStatus.isLoading(loadingStatusRef.current) &&
      loadingStatusRef.current !== Const.LoadingStatus.Complete
    ) {
      changeLoadingStatus(Const.LoadingStatus.NextLoading);
    }
  }, [changeLoadingStatus]);

  const loadRefreshList = useCallback(() => {
    if (!Const.LoadingStatus.isLoading(loadingStatus)) {
      changeLoadingStatus(Const.LoadingStatus.RefreshLoading);
    }
  }, [changeLoadingStatus, loadingStatus]);

  const keyExtractor = useCallback((item: T, idx: number) => (item ? `${item.id}` : `${idx}`), []);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleRefresh = useCallback(() => {
    if (isActiveRef.current) {
      setRefreshing(true);
      if (Platform.OS === 'android') {
        loadRefreshList();
        onRefresh?.();
      }
    }
  }, [loadRefreshList, onRefresh]);

  const handleScrollEndDrag = useCallback(() => {
    if (isActiveRef.current) {
      if (Platform.OS === 'ios' && refreshing) {
        loadRefreshList();
        onRefresh?.();
      }
    }
  }, [loadRefreshList, onRefresh, refreshing]);

  const handleRenderScrollView = useCallback(({onContentSizeChange, ...scrollViewProps}: ScrollViewProps) => {
    return (
      <ScrollView
        {...scrollViewProps}
        onContentSizeChange={(w, h) => {
          contentHeightRef.current = h;
          onContentSizeChange?.(w, h);
        }}
      />
    );
  }, []);

  const handleEndReached = useCallback(() => {
    if (isActiveRef.current) {
      if (!refreshing && !isComplete && !isLoading && !isEmpty && !Const.LoadingStatus.isError(loadingStatus)) {
        loadNextList();
      } else {
        if ((refreshing || isLoading) && !isComplete && !isEmpty && !Const.LoadingStatus.isError(loadingStatus)) {
          loadNextWheLoadComplete.current = true;
        }
      }
    }
  }, [isComplete, isEmpty, isLoading, loadNextList, loadingStatus, refreshing]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setFlatListHeight(event.nativeEvent.layout.height);
      onLayout?.(event);
    },
    [onLayout],
  );

  const handleRenderItem = useCallback(
    (info: ListRenderItemInfo<T>) =>
      info.item ? (props.renderItem ? props.renderItem(info) : null) : renderLoading ? renderLoading() : null,
    [props, renderLoading],
  );

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  const commands: ApiFlatListCommands<T> = useMemo(
    () => ({
      reload() {
        if (!Const.LoadingStatus.isLoading(loadingStatus)) {
          setList(undefined);
          changeLoadingStatus(Const.LoadingStatus.FirstLoading);
        }
      },
      refresh() {
        if (!Const.LoadingStatus.isLoading(loadingStatus)) {
          changeLoadingStatus(Const.LoadingStatus.RefreshLoading);
        }
      },
      getLoadingStatus() {
        return loadingStatus;
      },
      getList(): T[] | undefined {
        return list;
      },
      setList(newList: T[] | undefined, newLoadingStatus: LoadingStatus) {
        setList(newList);
        changeLoadingStatus(newLoadingStatus);
      },
      scrollToTop(scrollAnimated = false) {
        flatListRef.current?.scrollToOffset({offset: 0, animated: scrollAnimated});
      },
    }),
    [changeLoadingStatus, list, loadingStatus],
  );

  useEffect(() => {
    onCommands?.(commands);
  }, [commands, onCommands]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const footerLoadingComponent = useMemo(
    () => (
      <View>
        {loadingStatus === Const.LoadingStatus.NextLoading ? (
          <View>
            <Divider />
            <View mv={10}>
              <ActivityIndicator />
            </View>
          </View>
        ) : loadingStatus === Const.LoadingStatus.NextError ? (
          <View>
            <Divider />
            <View justifyContent='center' alignItems='center'>
              <IconButton
                icon='refresh'
                accessibilityLabel='재시도'
                onPress={() => changeLoadingStatus(Const.LoadingStatus.NextLoading)}
              />
            </View>
          </View>
        ) : null}
        {typeof ListFooterComponent === 'function' ? <ListFooterComponent /> : ListFooterComponent}
      </View>
    ),
    [ListFooterComponent, changeLoadingStatus, loadingStatus],
  );

  const data = useMemo(
    () => (isFirstLoading || (isRefreshLoading && empty(list)) ? [undefined as unknown as T] : list),
    [isFirstLoading, isRefreshLoading, list],
  );

  const refreshControl = useMemo(
    () =>
      isFirstError || isFirstLoading ? undefined : (
        <RefreshControl
          tintColor={theme.colors.textAccent}
          enabled={!isNextLoading}
          refreshing={refreshing}
          onRefresh={isNextLoading ? undefined : handleRefresh}
        />
      ),
    [handleRefresh, isFirstError, isFirstLoading, isNextLoading, refreshing, theme.colors.textAccent],
  );

  const ListHeaderComponent = useMemo(() => {
    if (InitListHeaderComponent) {
      if (typeof InitListHeaderComponent === 'function') {
        return (
          <View onLayout={(e) => setListHeaderHeight(e.nativeEvent.layout.height)}>
            <InitListHeaderComponent />
          </View>
        );
      } else {
        return (
          <Animated.View onLayout={(e) => setListHeaderHeight(e.nativeEvent.layout.height)}>
            {InitListHeaderComponent}
          </Animated.View>
        );
      }
    } else {
      setListHeaderHeight(0);
    }
  }, [InitListHeaderComponent]);

  const ListEmptyComponent = useMemo(() => {
    let height: number | undefined;

    if (emptyMinHeight !== undefined) {
      if (emptyHeight > 0 || ifUndefined(emptyMinHeight, 0) > 0) {
        const maxHeight = Math.max(
          parentHeight === undefined
            ? (flatListHeight || 0) - (listHeaderHeight || 0)
            : parentHeight - listHeaderHeight,
          ifUndefined(emptyMinHeight, 0),
        );

        height = Math.max(maxHeight, Math.max(emptyHeight, ifUndefined(emptyMinHeight, 0)));
        if (height > maxHeight) {
          height = maxHeight;
        }
      }
    } else {
      const maxHeight =
        parentHeight === undefined ? (flatListHeight || 0) - (listHeaderHeight || 0) : parentHeight - listHeaderHeight;

      height = Math.max(maxHeight, emptyHeight);
      if (height > maxHeight) {
        height = maxHeight;
      }
    }

    return onEmptyComponent ? (
      onEmptyComponent()
    ) : (
      <View height={ifUndefined(height, 0) > 0 ? height : undefined} alignItems='center' justifyContent='center'>
        {InitListEmptyComponent ? (
          <Animated.View style={{paddingVertical: 30}} onLayout={(e) => setEmptyHeight(e.nativeEvent.layout.height)}>
            {typeof InitListEmptyComponent === 'function' ? <InitListEmptyComponent /> : InitListEmptyComponent}
          </Animated.View>
        ) : (
          <BackAlert
            icon='emptyList'
            pv={30}
            text={ifUndefined(emptyText, '등록된 정보가 없습니다')}
            onLayout={(e) => {
              setEmptyHeight(e.nativeEvent.layout.height);
            }}
          />
        )}
      </View>
    );
  }, [
    InitListEmptyComponent,
    emptyHeight,
    emptyMinHeight,
    emptyText,
    flatListHeight,
    listHeaderHeight,
    onEmptyComponent,
    parentHeight,
  ]);

  const errorComponent = useMemo(() => {
    let height: number | undefined;
    if (errorHeight > 0) {
      height = parentHeight ? Math.max(parentHeight, errorHeight) : errorHeight;
    }
    return (
      <View flex={1} height={height} alignItems='center' justifyContent='center' padding={30}>
        <ApiErrorBackAlert
          onRetryPress={() => changeLoadingStatus(Const.LoadingStatus.FirstLoading)}
          onLayout={(e) => setErrorHeight(e.nativeEvent.layout.height)}
        />
      </View>
    );
  }, [changeLoadingStatus, errorHeight, parentHeight]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  const Control = animated ? Animated.FlatList : FlatList;

  return isFirstError ? (
    errorComponent
  ) : (
    <View flex={1}>
      <ActiveDetector onChange={(active) => (isActiveRef.current = active)} />

      <Control
        ref={flatListRef}
        {...props}
        data={data}
        keyboardDismissMode={ifUndefined(keyboardDismissMode, 'interactive')}
        keyboardShouldPersistTaps={ifUndefined(keyboardShouldPersistTaps, 'handled')}
        keyExtractor={keyExtractor}
        refreshControl={!disableRefresh ? refreshControl : undefined}
        onLayout={handleLayout}
        onEndReachedThreshold={onEndReachedThreshold}
        onEndReached={isFirstLoading ? undefined : handleEndReached}
        onScrollEndDrag={isFirstLoading ? undefined : handleScrollEndDrag}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={footerLoadingComponent}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={handleRenderItem}
        indicatorStyle={theme.dark ? 'white' : 'black'}
        renderScrollComponent={handleRenderScrollView}
      />
    </View>
  );
}

export default ApiFlatList;
