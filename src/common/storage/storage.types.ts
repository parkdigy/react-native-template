import {AppForceColorScheme} from '@context';
import {AuthSigninType, FaqListData, NoticeListData} from '@const';

export const StorageKey = {
  Theme: '$$theme$$',
  NoticeList: '$$notice_list$$',
  FaqList: '$$faq_list$$',
  // user
  Auth: '$$auth$$',
  Fcm: '$$fcm$$',
} as const;

export type TStorageKey = typeof StorageKey;
export type StorageKey = TStorageKey[keyof TStorageKey];

export type StorageKeyValueType<K extends StorageKey> = K extends TStorageKey['Theme']
  ? AppForceColorScheme
  : K extends TStorageKey['Auth']
    ? {authType: AuthSigninType; authKey: string}
    : K extends TStorageKey['Fcm']
      ? {token: string; userKey: string; osVersion: string; buildNumber: string}
      : K extends TStorageKey['NoticeList']
        ? {data_key: number; items: NoticeListData}
        : K extends TStorageKey['FaqList']
          ? {data_key: number; items: FaqListData}
          : never;
