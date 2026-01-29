/********************************************************************************************************************
 * FAQ 목록
 * ******************************************************************************************************************/

export interface FaqListDataItem {
  id: number;
  category: string;
  title: string;
  content: string;
}

export type FaqListData = FaqListDataItem[];

export interface FaqList extends ApiResult {
  data: {
    data_key: string;
    items?: FaqListData;
  };
}
