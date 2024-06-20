import {MMKV} from 'react-native-mmkv';
import {AuthSigninType} from '@const';
import {AppForceColorScheme} from '@context';
import {StorageKey} from './storage.types';

const MmkvStorage = new MMKV();

const storage = {
  Key: StorageKey,

  set(key: StorageKey, value: string | number | boolean) {
    MmkvStorage.set(key, value);
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
    return this.getString(StorageKey.Theme);
  },

  /********************************************************************************************************************
   * 인증 정보
   * ******************************************************************************************************************/

  setAuth(authType: AuthSigninType, authKey: string) {
    this.set(StorageKey.Auth, JSON.stringify({authType: authType, authKey: authKey}));
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
    this.set(StorageKey.Fcm, JSON.stringify({token, userKey, osVersion, buildNumber}));
  },

  getFcm() {
    const data = this.getString(StorageKey.Fcm);
    if (data) {
      return JSON.parse(data) as {token: string; userKey: string; osVersion: string; buildNumber: string};
    } else {
      return null;
    }
  },

  removeFcm() {
    this.remove(StorageKey.Fcm);
  },

  /********************************************************************************************************************
   * getData
   * ******************************************************************************************************************/

  getData<T>(key: StorageKey): {data_key: number; items: T} | undefined {
    try {
      const data = this.getString(key);
      if (data) {
        const jsData = JSON.parse(data);
        return {
          data_key: jsData.data_key,
          items: jsData.items,
        };
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  },
};

export default storage;
