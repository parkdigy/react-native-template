import {AppForceColorScheme} from '@context';
import {AuthSigninType, FaqListData, NoticeListData} from '@const';
import {FontFamily} from '@types';

export const StorageKey = {
  // Theme
  Theme: '$$theme$$',
  // FontFamily
  FontFamily: '$$font_family$$',
  // user
  Auth: '$$auth$$',
  Fcm: '$$fcm$$',
  // Notice
  NoticeList: '$$notice_list$$',
  // Faq
  FaqList: '$$faq_list$$',
} as const;

export type TStorageKey = typeof StorageKey;
export type StorageKey = TStorageKey[keyof TStorageKey];

export type StorageKeyValueType<K extends StorageKey> = K extends TStorageKey['Theme']
  ? AppForceColorScheme
  : K extends TStorageKey['FontFamily']
  ? FontFamily
  : K extends TStorageKey['Auth']
  ? {authType: AuthSigninType; authKey: string}
  : K extends TStorageKey['Fcm']
  ? {token: string; userKey: string; osVersion: string; buildNumber: string}
  : K extends TStorageKey['NoticeList']
  ? {data_key: number; items: NoticeListData}
  : K extends TStorageKey['FaqList']
  ? {data_key: number; items: FaqListData}
  : never;
