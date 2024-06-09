import {ApiResult} from '@api';

/********************************************************************************************************************
 * 공지사항 목록
 * ******************************************************************************************************************/

export interface NoticeListDataItem {
  id: number;
  title: string;
  notice_date: string;
}

export type NoticeListData = NoticeListDataItem[];

export interface NoticeList extends ApiResult {
  data: {
    data_key: number;
    items?: NoticeListData;
  };
}

/********************************************************************************************************************
 * 공지사항 정보
 * ******************************************************************************************************************/

export interface NoticeInfoData {
  id: number;
  title: string;
  notice_date: string;
  content: string;
}

export interface NoticeInfo extends ApiResult {
  data: NoticeInfoData;
}
