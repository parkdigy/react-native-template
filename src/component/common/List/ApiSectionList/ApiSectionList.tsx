/********************************************************************************************************************
 * API 섹션 리스트 컴포넌트
 * ******************************************************************************************************************/

import React, {useRef} from 'react';
import {LayoutChangeEvent, RefreshControl, SectionList, SectionListData, SectionListRenderItemInfo} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {LoadingStatus} from '@const';
import {useAppState} from '@context';
import ApiFlatList, {ApiFlatListCommands} from '../ApiFlatList';
import {
  ApiSectionListProps as Props,
  ApiSectionListItem,
  ApiSectionListSection,
  ApiSectionListCommands,
} from './ApiSectionList.types';

const _sections = [
  {
    title: ApiSectionListSection.Header,
    data: [undefined],
  },
  {
    title: ApiSectionListSection.List,
    data: [undefined],
  },
];

function ApiSectionList<T extends ApiSectionListItem>({
  perPageListItemCount,
  keyboardDismissMode,
  keyboardShouldPersistTaps,
  loadDelay = 500,
  errorDelay = 500,
  emptyText,
  emptyMinHeight,
  disableRefresh,
  reloadListWhenActiveFromBackground,
  reloadListWhenActiveFromLongTermDeActive,
  listPaddingHorizontal,
  listMarginTop,
  listMinHeight,
  refreshControlOffset,
  TopFixedComponent,
  TopComponent,
  TopFooterComponent,
  ListEmptyComponent,
  ListFixedComponent,
  ListHeaderComponent,
  renderListItem,
  renderLoading,
  ItemSeparatorComponent,
  initialNumToRender,
  windowSize,
  onLoadList,
  onList,
  onListHeight,
  onChangeLoadingStatus,
  onCommands,
  onRefresh,
  onLayout,
  onReloadWhenActiveFromBackground,
  onReloadWhenActiveFromLongTermDeActive,
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

  const sectionListRef = useRef<SectionList>(null);
  const inactiveTimeRef = useRef(0);
  const apiFlatListCommands = useRef<ApiFlatListCommands>(null);
  const loadingStatusRef = useRef<LoadingStatus>(Const.LoadingStatus.FirstLoading);
  const [headerSectionHeaderHeightResetTimeoutRef, setHeaderSectionHeaderHeightResetTimeout] = useTimeoutRef();
  const [listSectionHeaderHeightResetTimeoutRef, setListSectionHeaderHeightResetTimeout] = useTimeoutRef();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [refreshing, setRefreshing] = useState(false);
  const [sectionListHeight, setSectionListHeight] = useState(0);
  const [headerSectionHeaderHeight, setHeaderSectionHeaderHeight] = useState(0);
  const [headerSectionItemHeight, setHeaderSectionItemHeight] = useState(0);
  const [listSectionHeaderHeight, setListSectionHeaderHeight] = useState(0);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const listHeight = useMemo(() => {
    return Math.max(
      sectionListHeight - headerSectionHeaderHeight - headerSectionItemHeight - listSectionHeaderHeight,
      0,
    );
  }, [headerSectionHeaderHeight, headerSectionItemHeight, listSectionHeaderHeight, sectionListHeight]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (appState !== 'active' || !activeScreen) {
      inactiveTimeRef.current = new Date().getTime();
    }
  }, [appState, activeScreen]);

  useEffect(() => {
    onListHeight?.(listHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listHeight]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleRefresh = useCallback(() => {
    if (
      !contains(
        [Const.LoadingStatus.FirstError, Const.LoadingStatus.FirstLoading, Const.LoadingStatus.NextLoading],
        loadingStatusRef.current,
      )
    ) {
      setRefreshing(true);
      if (Platform.OS === 'android') {
        apiFlatListCommands.current?.refresh();
        onRefresh?.();
      }
    }
  }, [onRefresh]);

  const handleScrollEndDrag = useCallback(() => {
    if (Platform.OS === 'ios' && refreshing) {
      apiFlatListCommands.current?.refresh();
      onRefresh?.();
    }
  }, [onRefresh, refreshing]);

  const handleRenderSectionHeader = useCallback(
    ({section}: {section: SectionListData<T | undefined>}) => {
      switch (section.title) {
        case ApiSectionListSection.Header: {
          if (!TopFixedComponent) {
            setHeaderSectionHeaderHeightResetTimeout(() => {
              setHeaderSectionHeaderHeight(0);
            });
          } else {
            clearTimeout(headerSectionHeaderHeightResetTimeoutRef.current);
          }
          return TopFixedComponent ? (
            <View key={1} onLayout={(e) => setHeaderSectionHeaderHeight(e.nativeEvent.layout.height)}>
              {TopFixedComponent}
            </View>
          ) : null;
        }
        case ApiSectionListSection.List: {
          if (!ListFixedComponent) {
            setListSectionHeaderHeightResetTimeout(() => {
              setListSectionHeaderHeight(0);
            });
          } else {
            clearTimeout(listSectionHeaderHeightResetTimeoutRef.current);
          }
          return ListFixedComponent ? (
            <View onLayout={(e) => setListSectionHeaderHeight(e.nativeEvent.layout.height)}>{ListFixedComponent}</View>
          ) : null;
        }
        default:
          return null;
      }
    },
    [
      TopFixedComponent,
      setHeaderSectionHeaderHeightResetTimeout,
      headerSectionHeaderHeightResetTimeoutRef,
      ListFixedComponent,
      setListSectionHeaderHeightResetTimeout,
      listSectionHeaderHeightResetTimeoutRef,
    ],
  );

  const handleRenderSectionFooter = useCallback(
    ({section}: {section: SectionListData<T | undefined>}) => {
      switch (section.title) {
        case ApiSectionListSection.Header:
          return ifUndefined(TopFooterComponent, null);
        default:
          return null;
      }
    },
    [TopFooterComponent],
  );

  const handleApiFlatListChangeLoadingStatus = useCallback(
    (loadingStatus: LoadingStatus) => {
      onChangeLoadingStatus?.(loadingStatus);
      loadingStatusRef.current = loadingStatus;

      if (refreshing && !Const.LoadingStatus.isLoading(loadingStatus)) {
        setRefreshing(false);
      }
    },
    [onChangeLoadingStatus, refreshing],
  );

  const handleApiFlatListChangeCommands = useCallback((commands: ApiFlatListCommands<T>) => {
    apiFlatListCommands.current = commands;
  }, []);

  const handleList = useCallback(
    (list: T[] | undefined, loadingStatus: LoadingStatus) => {
      if (list === undefined) {
        sectionListRef.current?.scrollToLocation({sectionIndex: 0, itemIndex: 0, animated: false});
      }
      onList?.(list, loadingStatus);
    },
    [onList],
  );

  const handleRenderItem = useCallback(
    (info: SectionListRenderItemInfo<T | undefined>) => {
      switch (info.section.title) {
        case ApiSectionListSection.Header: {
          return TopComponent ? (
            <View onLayout={(e) => setHeaderSectionItemHeight(e.nativeEvent.layout.height)}>{TopComponent}</View>
          ) : null;
        }
        case ApiSectionListSection.List:
          return (
            <View ph={ifUndefined(listPaddingHorizontal, 15)} mt={listMarginTop} minHeight={listMinHeight}>
              <ApiFlatList
                scrollEnabled={false}
                initialNumToRender={initialNumToRender}
                windowSize={windowSize}
                disableRefresh
                loadDelay={loadDelay}
                errorDelay={errorDelay}
                keyboardDismissMode={keyboardDismissMode}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                perPageListItemCount={perPageListItemCount}
                reloadListWhenActiveFromBackground={reloadListWhenActiveFromBackground}
                reloadListWhenActiveFromLongTermDeActive={reloadListWhenActiveFromLongTermDeActive}
                emptyText={emptyText}
                emptyMinHeight={emptyMinHeight}
                parentHeight={listHeight}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={ListEmptyComponent}
                onLoadList={onLoadList}
                renderItem={(v) => renderListItem(v.item, v.index)}
                renderLoading={renderLoading}
                onList={handleList}
                onChangeLoadingStatus={handleApiFlatListChangeLoadingStatus}
                onCommands={handleApiFlatListChangeCommands}
                onReloadWhenActiveFromBackground={onReloadWhenActiveFromBackground}
                onReloadWhenActiveFromLongTermDeActive={onReloadWhenActiveFromLongTermDeActive}
              />
            </View>
          );
        default:
          return null;
      }
    },
    [
      listPaddingHorizontal,
      listMarginTop,
      listMinHeight,
      initialNumToRender,
      windowSize,
      loadDelay,
      errorDelay,
      keyboardDismissMode,
      keyboardShouldPersistTaps,
      perPageListItemCount,
      reloadListWhenActiveFromBackground,
      reloadListWhenActiveFromLongTermDeActive,
      emptyText,
      emptyMinHeight,
      listHeight,
      ItemSeparatorComponent,
      ListHeaderComponent,
      ListEmptyComponent,
      onLoadList,
      renderLoading,
      handleList,
      handleApiFlatListChangeLoadingStatus,
      handleApiFlatListChangeCommands,
      onReloadWhenActiveFromBackground,
      onReloadWhenActiveFromLongTermDeActive,
      TopComponent,
      renderListItem,
    ],
  );

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      setSectionListHeight(e.nativeEvent.layout.height);
      onLayout?.(e);
    },
    [onLayout],
  );

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  const commands: ApiSectionListCommands = useMemo(() => {
    return {
      reloadList() {
        apiFlatListCommands.current?.reload();
      },
      refreshList() {
        apiFlatListCommands.current?.refresh();
      },
      getLoadingStatus(): LoadingStatus {
        return apiFlatListCommands.current?.getLoadingStatus() || LoadingStatus.FirstLoading;
      },
      getList(): T[] | undefined {
        return apiFlatListCommands.current?.getList() as T[] | undefined;
      },
      setList(newList: T[] | undefined, loadingStatus: LoadingStatus) {
        apiFlatListCommands.current?.setList(newList, loadingStatus);
      },
      scrollToTop(scrollAnimated = false) {
        sectionListRef.current?.scrollToLocation({sectionIndex: 0, itemIndex: 0, animated: scrollAnimated});
      },
    };
  }, []);

  useEffect(() => {
    onCommands?.(commands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commands]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        tintColor={theme.colors.textAccent}
        refreshing={refreshing}
        progressViewOffset={refreshControlOffset}
        onRefresh={handleRefresh}
      />
    ),
    [handleRefresh, refreshControlOffset, refreshing, theme.colors.textAccent],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <SectionList
      ref={sectionListRef}
      sections={_sections}
      initialNumToRender={initialNumToRender}
      windowSize={windowSize}
      stickySectionHeadersEnabled={true}
      keyboardDismissMode={ifUndefined(keyboardDismissMode, 'interactive')}
      keyboardShouldPersistTaps={ifUndefined(keyboardShouldPersistTaps, 'handled')}
      renderItem={handleRenderItem}
      renderSectionHeader={handleRenderSectionHeader}
      renderSectionFooter={handleRenderSectionFooter}
      onScrollEndDrag={handleScrollEndDrag}
      refreshControl={disableRefresh ? undefined : refreshControl}
      onLayout={handleLayout}
      indicatorStyle={theme.dark ? 'white' : 'black'}
      {...props}
    />
  );
}

export default ApiSectionList;
