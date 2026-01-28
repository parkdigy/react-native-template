import {createMMKV} from 'react-native-mmkv';
import {type AuthSigninType, type ConfigInfoData, type FaqListData, type NoticeListData} from '@const';
import {type AppForceColorScheme} from '@context';
import {type StorageAuthInfo, StorageKey, type StorageKeyValueType} from './storage.types';
import userStorage from './userStorage';
import dayjs from 'dayjs';

const MmkvStorage = createMMKV();

const storage = {
  Key: StorageKey,

  user: userStorage,

  set<K extends StorageKey>(key: K, value: StorageKeyValueType<K>) {
    if (value instanceof ArrayBuffer) {
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
      case StorageKey.AppKey:
      case StorageKey.InstallAppKey:
      case StorageKey.Theme:
      case StorageKey.LastLoginType:
        return this.getString(key) as RT;
      case StorageKey.CacheCleanDay:
        return this.getNumber(key) as RT;
      case StorageKey.Config:
      case StorageKey.Auth:
      case StorageKey.ServerDate:
      case StorageKey.NoticeList:
      case StorageKey.FaqList:
        return this.getObject(key) as RT;
      default:
        throw new Error('storage.get - 정의되지 않은 StorageKey!');
    }
  },
  remove(key: StorageKey) {
    MmkvStorage.remove(key);
  },

  /********************************************************************************************************************
   * 앱 KEY
   * ******************************************************************************************************************/

  setAppKey(appKey: string) {
    this.set(StorageKey.AppKey, appKey);
  },

  getAppKey() {
    return this.get(StorageKey.AppKey);
  },

  /********************************************************************************************************************
   * 설치 앱 KEY
   * ******************************************************************************************************************/

  setInstallAppKey(installAppKey: string) {
    this.set(StorageKey.InstallAppKey, installAppKey);
  },

  getInstallAppKey() {
    return this.get(StorageKey.InstallAppKey);
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
   * 설정 정보
   * ******************************************************************************************************************/

  setConfig(config: ConfigInfoData) {
    this.set(StorageKey.Config, config);
  },

  getConfig() {
    return this.get(StorageKey.Config);
  },

  /********************************************************************************************************************
   * 인증 정보
   * ******************************************************************************************************************/

  setAuth(auth: StorageAuthInfo) {
    this.set(StorageKey.Auth, auth);
  },

  removeAuth() {
    this.remove(StorageKey.Auth);
  },

  getAuth() {
    return this.get(StorageKey.Auth);
  },

  /********************************************************************************************************************
   * 마지막 로그인 타입
   * ******************************************************************************************************************/

  setLastLoginType(type: AuthSigninType) {
    this.set(StorageKey.LastLoginType, type);
  },

  getLastLoginType() {
    return this.get(StorageKey.LastLoginType);
  },

  /********************************************************************************************************************
   * Notice List
   * ******************************************************************************************************************/

  setNoticeList(dataKey: string, items: NoticeListData) {
    this.set(StorageKey.NoticeList, {data_key: dataKey, items});
  },

  getNoticeList() {
    return this.get(StorageKey.NoticeList);
  },

  /********************************************************************************************************************
   * Faq List
   * ******************************************************************************************************************/

  setFaqList(dataKey: string, items: FaqListData) {
    this.set(StorageKey.FaqList, {data_key: dataKey, items});
  },

  getFaqList() {
    return this.get(StorageKey.FaqList);
  },

  /********************************************************************************************************************
   * 서버 시간
   * ******************************************************************************************************************/

  setServerDate(date: Date) {
    this.set(StorageKey.ServerDate, {server_time: date.getTime(), local_time: performance.now()});
  },

  getServerDate() {
    try {
      const data = this.get(StorageKey.ServerDate);
      if (data) {
        const serverTime = data.server_time + Math.floor(performance.now() - data.local_time);
        return new Date(serverTime);
      } else {
        return now();
      }
    } catch {
      return now();
    }
  },

  getServerDay() {
    return Number(dayjs(this.getServerDate()).format('YYYYMMDD'));
  },
};

export default storage;
