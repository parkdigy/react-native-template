/********************************************************************************************************************
 * API 섹션 리스트 컴포넌트
 * ******************************************************************************************************************/

import React, {useRef} from 'react';
import {LayoutChangeEvent, RefreshControl, SectionList, SectionListData, SectionListRenderItemInfo} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {LoadingStatus} from '@const';
import {useAppState} from '@context';
import {ApiFlatListCommands} from '@ccomp';
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
  reloadListWhenActiveFromBackground,
  reloadListWhenActiveFromLongTermDeActive,
  listPaddingHorizontal,
  listMarginTop,
  listMinHeight,
  TopFixedComponent,
  TopComponent,
  TopFooterComponent,
  ListEmptyComponent,
  ListFixedComponent,
  ListHeaderComponent,
  renderListItem,
  renderLoading,
  ItemSeparatorComponent,
  onLoadList,
  onList,
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
  const apiFlatListCommands = useRef<ApiFlatListCommands>();
  const loadingStatusRef = useRef<LoadingStatus>(Const.LoadingStatus.FirstLoading);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [refreshing, setRefreshing] = useState(false);
  const [sectionListHeight, setSectionListHeight] = useState(0);
  const [headerSectionHeaderHeight, setHeaderSectionHeaderHeight] = useState(0);
  const [headerSectionItemHeight, setHeaderSectionItemHeight] = useState(0);
  const [listSectionHeaderHeight, setListSectionHeaderHeight] = useState(0);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (appState !== 'active' || !activeScreen) {
      inactiveTimeRef.current = new Date().getTime();
    }
  }, [appState, activeScreen]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const listHeight = useMemo(
    () =>
      Math.max(sectionListHeight - headerSectionHeaderHeight - headerSectionItemHeight - listSectionHeaderHeight, 0),
    [headerSectionHeaderHeight, headerSectionItemHeight, listSectionHeaderHeight, sectionListHeight],
  );

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
        onRefresh && onRefresh();
      }
    }
  }, [onRefresh]);

  const handleScrollEndDrag = useCallback(() => {
    if (Platform.OS === 'ios' && refreshing) {
      apiFlatListCommands.current?.refresh();
      onRefresh && onRefresh();
    }
  }, [onRefresh, refreshing]);

  const handleRenderSectionHeader = useCallback(
    ({section}: {section: SectionListData<T | undefined>}) => {
      switch (section.title) {
        case ApiSectionListSection.Header: {
          if (!TopFixedComponent) {
            nextTick(() => {
              setHeaderSectionHeaderHeight(0);
            });
          }
          return TopFixedComponent ? (
            <View key={1} onLayout={(e) => setHeaderSectionHeaderHeight(e.nativeEvent.layout.height)}>
              {TopFixedComponent}
            </View>
          ) : null;
        }
        case ApiSectionListSection.List: {
          if (!ListFixedComponent) {
            nextTick(() => {
              setListSectionHeaderHeight(0);
            });
          }
          return ListFixedComponent ? (
            <View onLayout={(e) => setListSectionHeaderHeight(e.nativeEvent.layout.height)}>{ListFixedComponent}</View>
          ) : null;
        }
        default:
          return null;
      }
    },
    [TopFixedComponent, ListFixedComponent],
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
      onChangeLoadingStatus && onChangeLoadingStatus(loadingStatus);
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
      onList && onList(list, loadingStatus);
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
            <View ph={ifUndefined(listPaddingHorizontal, 24)} mt={listMarginTop} minHeight={listMinHeight}>
              <ApiFlatList
                scrollEnabled={false}
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
      onLayout && onLayout(e);
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
      scrollToTop(animated = false) {
        sectionListRef.current?.scrollToLocation({sectionIndex: 0, itemIndex: 0, animated});
      },
    };
  }, []);

  useEffect(() => {
    onCommands && onCommands(commands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commands]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const refreshControl = useMemo(
    () => <RefreshControl tintColor={theme.colors.textAccent} refreshing={refreshing} onRefresh={handleRefresh} />,
    [handleRefresh, refreshing, theme.colors.textAccent],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <SectionList
      ref={sectionListRef}
      sections={_sections}
      stickySectionHeadersEnabled={true}
      keyboardDismissMode={ifUndefined(keyboardDismissMode, 'interactive')}
      keyboardShouldPersistTaps={ifUndefined(keyboardShouldPersistTaps, 'handled')}
      renderItem={handleRenderItem}
      renderSectionHeader={handleRenderSectionHeader}
      renderSectionFooter={handleRenderSectionFooter}
      onScrollEndDrag={handleScrollEndDrag}
      refreshControl={refreshControl}
      onLayout={handleLayout}
      indicatorStyle={theme.dark ? 'white' : 'black'}
      {...props}
    />
  );
}

export default ApiSectionList;
