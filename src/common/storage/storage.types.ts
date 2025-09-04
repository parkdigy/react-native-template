import {AppAuthInfo, AppForceColorScheme} from '@context';
import {AuthSigninType, ConfigInfoData, FaqListData, NoticeListData} from '@const';

export const StorageKey = {
  AppKey: 'app_key', // 앱 키
  InstallAppKey: 'install_app_key', // 설치 앱 키
  Theme: '$$theme$$', // 테마
  Config: 'config', // 설정
  Auth: '$$auth$$', // 회원 정보
  LastLoginType: '$$last_login_type$$', // 마지막 로그인 타입
  ServerDate: '$$server_date$$', // 서버 시간
  CacheCleanDay: '$$cache_clean_day$$', // 캐시 정리 일자
  NoticeList: '$$notice_list$$', // 공지사항 목록
  FaqList: '$$faq_list$$', // FAQ 목록
} as const;

export type TStorageKey = typeof StorageKey;
export type StorageKey = TStorageKey[keyof TStorageKey];

export type StorageKeyValueType<K extends StorageKey> = K extends TStorageKey['AppKey']
  ? string
  : K extends TStorageKey['InstallAppKey']
  ? string
  : K extends TStorageKey['Theme']
  ? AppForceColorScheme
  : K extends TStorageKey['Config']
  ? ConfigInfoData
  : K extends TStorageKey['Auth']
  ? StorageAuthInfo
  : K extends TStorageKey['LastLoginType']
  ? AuthSigninType
  : K extends TStorageKey['ServerDate']
  ? {server_time: number; local_time: number}
  : K extends TStorageKey['CacheCleanDay']
  ? number
  : K extends TStorageKey['NoticeList']
  ? {data_key: string; items: NoticeListData}
  : K extends TStorageKey['FaqList']
  ? {data_key: string; items: FaqListData}
  : never;

/********************************************************************************************************************
 * 인증
 * ******************************************************************************************************************/
export interface StorageAuthInfo {
  authData: AppAuthInfo;
  authKey: string;
}
