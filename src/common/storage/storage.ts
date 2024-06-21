import {MMKV} from 'react-native-mmkv';
import {AuthSigninType, FaqListData, NoticeListData} from '@const';
import {AppForceColorScheme} from '@context';
import {StorageKey, StorageKeyValueType} from './storage.types';

const MmkvStorage = new MMKV();

const storage = {
  Key: StorageKey,

  set<K extends StorageKey>(key: K, value: StorageKeyValueType<K>) {
    if (value instanceof Uint8Array) {
      MmkvStorage.set(key, value);
    } else if (typeof value === 'object') {
      MmkvStorage.set(key, JSON.stringify(value));
    } else {
      MmkvStorage.set(key, value as any);
    }
  },
  getString(key: StorageKey) {
    return MmkvStorage.getString(key);
  },
  getNumber(key: StorageKey) {
    return MmkvStorage.getNumber(key);
  },
  getBoolean(key: StorageKey) {
    return MmkvStorage.getBoolean(key);
  },
  getObject(key: StorageKey) {
    const data = MmkvStorage.getString(key);
    return data ? JSON.parse(data) : undefined;
  },
  get<K extends StorageKey, RT = StorageKeyValueType<K>>(key: K): RT | undefined {
    switch (key) {
      case StorageKey.Theme:
        return this.getString(key) as RT;
      case StorageKey.Auth:
        return this.getObject(key) as RT;
      case StorageKey.Fcm:
        return this.getObject(key) as RT;
      case StorageKey.NoticeList:
        return this.getObject(key) as RT;
      case StorageKey.FaqList:
        return this.getObject(key) as RT;
      default:
        throw new Error('storage.get - 정의되지 않은 StorageKey!');
    }
  },
  remove(key: StorageKey) {
    MmkvStorage.delete(key);
  },

  /********************************************************************************************************************
   * 테마
   * ******************************************************************************************************************/

  setTheme(theme: AppForceColorScheme) {
    this.set(StorageKey.Theme, theme);
  },

  getTheme() {
    return this.get(StorageKey.Theme);
  },

  /********************************************************************************************************************
   * 인증 정보
   * ******************************************************************************************************************/

  setAuth(authType: AuthSigninType, authKey: string) {
    this.set(StorageKey.Auth, {authType: authType, authKey: authKey});
  },

  removeAuth() {
    this.remove(StorageKey.Auth);
  },

  getAuth() {
    const data = this.getString(StorageKey.Auth);
    if (data) {
      return JSON.parse(data) as {authType: AuthSigninType; authKey: string};
    } else {
      return null;
    }
  },

  /********************************************************************************************************************
   * FCM 정보
   * ******************************************************************************************************************/

  setFcm(token: string, userKey: string, osVersion: string, buildNumber: string) {
    this.set(StorageKey.Fcm, {token, userKey, osVersion, buildNumber});
  },

  getFcm() {
    return this.get(StorageKey.Fcm);
  },

  removeFcm() {
    this.remove(StorageKey.Fcm);
  },

  /********************************************************************************************************************
   * Notice List
   * ******************************************************************************************************************/

  setNoticeList(dataKey: number, items: NoticeListData) {
    this.set(StorageKey.NoticeList, {data_key: dataKey, items});
  },

  getNoticeList() {
    return this.get(StorageKey.NoticeList);
  },

  /********************************************************************************************************************
   * Faq List
   * ******************************************************************************************************************/

  setFaqList(dataKey: number, items: FaqListData) {
    this.set(StorageKey.FaqList, {data_key: dataKey, items});
  },

  getFaqList() {
    return this.get(StorageKey.FaqList);
  },
};

export default storage;
