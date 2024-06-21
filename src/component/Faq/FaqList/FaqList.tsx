/********************************************************************************************************************
 * 'FAQ 목록' 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {useFirstSkipEffect} from '@pdg/react-hook';
import {FaqListData, FaqListDataItem, LoadingStatus} from '@const';
import {ApiSectionListCommands, FormSearchTextCommands, FormToggleButtonGroupItems} from '@ccomp';
import {FaqListProps as Props} from './FaqList.types';
import {FaqListItem, FaqListLoading} from './controls';

const LIMIT = 99999;

// const Section = {
//   Search: 'search',
//   List: 'list',
// };

const FaqList = ({}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const apiSectionListCommands = useRef<ApiSectionListCommands | null>();
  const keywordRef = useRef<FormSearchTextCommands>(null);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [activeId, setActiveId] = useState<number | undefined>();
  const [category, setCategory] = useState<string | undefined>('');
  const [categoryItems, setCategoryItems] = useState<FormToggleButtonGroupItems<string>>();
  const [list, setList] = useState<FaqListData>();
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>();
  const [keyword, setKeyword] = useState<string>();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const isLoading = useMemo(
    () => loadingStatus === undefined || Const.LoadingStatus.isLoading(loadingStatus),
    [loadingStatus],
  );

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useFirstSkipEffect(() => {
    setActiveId(undefined);
    if (list) {
      const finalList = filterList(list);
      apiSectionListCommands.current?.setList(
        finalList,
        empty(finalList) ? LoadingStatus.Empty : LoadingStatus.Complete,
      );
    }
  }, [category, keyword]);

  useEffect(() => {
    if (list) {
      const newCategoryList: string[] = [];
      let lastCategory: string | undefined;
      list.forEach((info) => {
        if (info.category !== lastCategory) {
          newCategoryList.push(info.category);
          lastCategory = info.category;
        }
      });
      const items: FormToggleButtonGroupItems<string> = newCategoryList.map((c) => lv(c, c));
      items.unshift(lv('전체', ''));
      setCategoryItems(items);
    } else {
      setCategoryItems(undefined);
    }
  }, [list]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const filterList = useCallback(
    (l: FaqListData) => {
      let newList = empty(category) ? l : l.filter((info) => info.category === category);
      if (notEmpty(keyword)) {
        const finalKeyword = keyword.toLowerCase();
        newList = newList.filter(
          (info) =>
            info.title.toLowerCase().includes(finalKeyword) || info.content.toLowerCase().includes(finalKeyword),
        );
      }
      return newList;
    },
    [category, keyword],
  );

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleKeywordSubmit = useCallback(() => {
    setKeyword(keywordRef.current?.getValue());
  }, []);

  const handleLoadList = useCallback(() => {
    return new Promise<FaqListData>((resolve, reject) => {
      const storageData = storage.getFaqList();
      const localDataKey = storageData?.data_key;
      const localItems = storageData?.items;

      const params: Dict = {};
      if (localDataKey) {
        params.data_key = localDataKey;
      }

      Const.Faq.list(params)
        .then(({data: {data_key, items}}) => {
          let newItems: FaqListData | undefined;
          if (data_key === localDataKey && localItems) {
            newItems = localItems;
          } else if (items) {
            newItems = items;
            storage.setFaqList(data_key, items);
          } else {
            storage.remove(storage.Key.FaqList);
          }

          if (newItems) {
            setList(newItems);
            resolve(filterList(newItems));
          }
        })
        .catch((err) => reject(err));
    });
  }, [filterList]);

  const handleRenderListItem = useCallback(
    (item: FaqListDataItem) => {
      return (
        <FaqListItem
          info={item}
          active={activeId === item.id}
          onPress={(info: FaqListDataItem) => {
            setActiveId((old) => (old === info.id ? undefined : info.id));
          }}
        />
      );
    },
    [activeId],
  );

  const handleRenderLoading = useCallback(() => <FaqListLoading />, []);

  const handleCommands = useCallback((commands: ApiSectionListCommands | null) => {
    apiSectionListCommands.current = commands;
  }, []);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const topComponent = useMemo(
    () => (
      <View ph={15} pt={15}>
        <FormSearchText
          ref={keywordRef}
          name='keyword'
          placeholder='검색어를 입력하세요.'
          disabled={isLoading}
          hideClearSearch={empty(keyword)}
          value={keyword}
          onSubmitEditing={handleKeywordSubmit}
          onSubmit={handleKeywordSubmit}
        />
      </View>
    ),
    [handleKeywordSubmit, isLoading, keyword],
  );

  const listFixedComponent = useMemo(
    () =>
      notEmpty(categoryItems) ? (
        <View pv={15} mb={12} backgroundColor={theme.colors.background}>
          <FormToggleButtonGroup
            name='category'
            buttonType='chip'
            horizontal
            scrollViewContentPaddingHorizontal={15}
            value={category}
            items={categoryItems}
            disabled={isLoading}
            onChange={(v) => {
              setCategory(v);
            }}
          />
        </View>
      ) : undefined,
    [category, categoryItems, isLoading, theme.colors.background],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <ApiSectionList
      reloadListWhenActiveFromLongTermDeActive
      contentContainerStyle={{paddingBottom: 15}}
      perPageListItemCount={LIMIT}
      emptyText='검색된 항목이 없습니다'
      TopComponent={topComponent}
      ListFixedComponent={listFixedComponent}
      renderListItem={handleRenderListItem}
      renderLoading={handleRenderLoading}
      onLoadList={handleLoadList}
      onChangeLoadingStatus={setLoadingStatus}
      onCommands={handleCommands}
    />
  );
};

export default FaqList;
