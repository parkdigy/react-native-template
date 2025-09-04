import {FontFamily} from '@types';

export const UserStorageKey = {
  FontFamily: 'font_family', // 폰트
  Fcm: 'fcm', // FCM
} as const;

export type TUserStorageKey = typeof UserStorageKey;
export type UserStorageKey = TUserStorageKey[keyof TUserStorageKey];

export type UserStorageKeyValueType<K extends UserStorageKey> = K extends TUserStorageKey['FontFamily']
  ? FontFamily
  : K extends TUserStorageKey['Fcm']
  ? UserStorageFcm
  : never;

/********************************************************************************************************************
 * FCM
 * ******************************************************************************************************************/

export interface UserStorageFcm {
  token: string;
  osVersion: string;
  buildNumber: string;
}
