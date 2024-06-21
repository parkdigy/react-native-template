/********************************************************************************************************************
 * '더보기 > 공지사항' 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {NoticeListData, NoticeListDataItem} from '@const';
import {NoticeListProps as Props} from './NoticeList.types';
import {NoticeListItem, NoticeListLoading} from './controls';

const LIMIT = 20;

const NoticeList = ({navigation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [containerHeight, setContainerHeight] = useState(0);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleLoadList = useCallback((lastId?: number) => {
    return new Promise<NoticeListData>((resolve, reject) => {
      if (lastId === undefined) {
        const storageData = storage.getNoticeList();
        const localDataKey = storageData?.data_key;
        const localItems = storageData?.items;

        const params: Dict = {limit: LIMIT};
        if (localDataKey) {
          params.data_key = localDataKey;
        }

        Const.Notice.list(params)
          .then(({data: {data_key, items}}) => {
            if (data_key === localDataKey && localItems) {
              resolve(localItems);
            } else if (items) {
              resolve(items);
              storage.setNoticeList(data_key, items);
            } else {
              storage.remove(storage.Key.NoticeList);
            }
          })
          .catch((err) => reject(err));
      } else {
        Const.Notice.list({limit: LIMIT, last_id: lastId})
          .then(({data: {items}}) => {
            if (items) {
              resolve(items);
            }
          })
          .catch((err) => reject(err));
      }
    });
  }, []);

  const handleRenderItem = useCallback(
    ({item}: ListRenderItemInfo<NoticeListDataItem>) => (
      <NoticeListItem
        theme={theme}
        key={item.id}
        info={item}
        onPress={() => app.navigate(navigation, 'NoticeInfo', {info: item})}
      />
    ),
    [navigation, theme],
  );

  const handleRenderLoading = useCallback(() => <NoticeListLoading />, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View flex={1} onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}>
      <ApiFlatList
        reloadListWhenActiveFromLongTermDeActive
        parentHeight={containerHeight}
        perPageListItemCount={LIMIT}
        onLoadList={handleLoadList}
        ItemSeparatorComponent={Divider}
        emptyText='공지사항이 없습니다'
        style={{backgroundColor: theme.colors.background}}
        contentContainerStyle={{paddingHorizontal: 15}}
        renderItem={handleRenderItem}
        renderLoading={handleRenderLoading}
      />
    </View>
  );
};

export default NoticeList;
