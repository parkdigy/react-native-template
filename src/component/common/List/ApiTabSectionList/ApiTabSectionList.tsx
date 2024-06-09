/********************************************************************************************************************
 * API 탭 섹션 리스트 컴포넌트
 * ******************************************************************************************************************/

import React, {useRef} from 'react';
import {useFirstSkipEffect} from '@pdg/react-hook';
import {LoadingStatus} from '@const';
import {ApiSectionListCommands, ApiSectionListItem} from '../ApiSectionList';
import TabBar, {TabBarItemValue} from '../../TabBar';
import {ApiTabSectionListProps as Props} from './ApiTabSectionList.types';

function ApiTabSectionList<T extends ApiSectionListItem, TAB extends TabBarItemValue>({
  tab: initTab,
  tabItems,
  renderListItem,
  renderLoading,
  onChangeTab,
  onChangeLoadingStatus,
  onLoadList,
  onList,
  onCommands,
  ...props
}: Props<T, TAB>) {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const apiSectionListCommands = useRef<ApiSectionListCommands>();
  const tabListRef = useRef<Dict<T[] | undefined>>({});
  const tabLoadingStatusRef = useRef<Dict<LoadingStatus>>({});
  const tabMustReloadRef = useRef<Dict<boolean>>({});

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [tab, setTab] = useState<TAB>(initTab);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const isLoading = useMemo(() => !!loadingStatus && Const.LoadingStatus.isLoading(loadingStatus), [loadingStatus]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useFirstSkipEffect(() => {
    setTab(initTab);
  }, [initTab]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const changeTab = useCallback(
    (newTab: TAB) => {
      if (tabMustReloadRef.current[newTab]) {
        apiSectionListCommands.current?.setList(undefined, LoadingStatus.FirstLoading);
      } else {
        let newLoadingStatus: LoadingStatus = LoadingStatus.FirstLoading;
        if (tabLoadingStatusRef.current[newTab]) {
          newLoadingStatus = tabLoadingStatusRef.current[newTab];
          setLoadingStatus(loadingStatus);
        }
        apiSectionListCommands.current?.setList(tabListRef.current[newTab], newLoadingStatus);

        if (tabListRef.current[newTab] === undefined) {
          nextTick(() => {
            apiSectionListCommands.current?.reloadList();
          });
        }
      }

      setTab(newTab);
      onChangeTab && onChangeTab(newTab);
    },
    [loadingStatus, onChangeTab],
  );

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleLoadList = useCallback(
    (lastId?: number) => {
      return new Promise<T[]>((resolve, reject) => {
        onLoadList(tab, lastId)
          .then((list) => {
            tabMustReloadRef.current[tab] = false;
            resolve(list);
          })
          .catch((err) => reject(err));
      });
    },
    [onLoadList, tab],
  );

  const handleList = useCallback(
    (list: T[] | undefined, newLoadingStatus: LoadingStatus) => {
      tabListRef.current[tab] = list;
      tabLoadingStatusRef.current[tab] = newLoadingStatus;

      onList && onList(tab, list, newLoadingStatus);
    },
    [onList, tab],
  );

  const handleRenderListItem = useCallback(
    (item: T, index: number) => {
      return renderListItem(tab, item, index);
    },
    [renderListItem, tab],
  );

  const handleRenderLoading = useCallback(() => {
    return renderLoading ? renderLoading(tab) : null;
  }, [renderLoading, tab]);

  const handleChangeLoadingStatus = useCallback(
    (newLoadingStatus: LoadingStatus) => {
      setLoadingStatus(newLoadingStatus);
      onChangeLoadingStatus && onChangeLoadingStatus(tab, newLoadingStatus);
    },
    [onChangeLoadingStatus, tab],
  );

  const handleCommands = useCallback(
    (commands: ApiSectionListCommands) => {
      apiSectionListCommands.current = commands;
      onCommands && onCommands(commands);
    },
    [onCommands],
  );

  const handleReloadWhenActiveFromLongTermDeActive = useCallback(() => {
    tabItems.map(({value}) => {
      tabMustReloadRef.current[value] = value !== tab;
    });
  }, [tab, tabItems]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const ListFixedComponent = useMemo(
    () => (
      <View>
        <TabBar
          backgroundColor={theme.colors.background}
          items={tabItems.map((info) => ({...info, disabled: info.disabled || isLoading}))}
          value={tab}
          onChange={changeTab}
        />
      </View>
    ),
    [changeTab, tab, tabItems, isLoading, theme.colors.background],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <ApiSectionList
      {...props}
      onLoadList={handleLoadList}
      onList={handleList}
      ListFixedComponent={ListFixedComponent}
      renderListItem={handleRenderListItem}
      renderLoading={handleRenderLoading}
      onChangeLoadingStatus={handleChangeLoadingStatus}
      onCommands={handleCommands}
      onReloadWhenActiveFromLongTermDeActive={handleReloadWhenActiveFromLongTermDeActive}
    />
  );
}

export default ApiTabSectionList;
