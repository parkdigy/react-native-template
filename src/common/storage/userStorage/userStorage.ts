import {MMKV} from 'react-native-mmkv';
import {FontFamily} from '@types';
import {UserStorageKey, UserStorageKeyValueType} from './userStorage.types';

let MmkvStorage: MMKV | undefined;

export const userStorage = {
  Key: UserStorageKey,

  init(userKey: string) {
    MmkvStorage = new MMKV({id: userKey});
  },
  uninit() {
    MmkvStorage = undefined;
  },
  clearAll(exceptKeys: string[] = []) {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    for (const key of MmkvStorage.getAllKeys()) {
      if (!exceptKeys.includes(key)) {
        MmkvStorage.delete(key);
      }
    }
  },
  getAllKeys() {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    return MmkvStorage.getAllKeys();
  },
  set<K extends UserStorageKey>(key: K, value: UserStorageKeyValueType<K>) {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    if (value instanceof Uint8Array) {
      MmkvStorage.set(key, value);
    } else if (typeof value === 'object') {
      MmkvStorage.set(key, JSON.stringify(value));
    } else {
      MmkvStorage.set(key, value as any);
    }
  },
  getString(key: UserStorageKey) {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    return MmkvStorage.getString(key);
  },
  getNumber(key: UserStorageKey) {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    return MmkvStorage.getNumber(key);
  },
  getBoolean(key: UserStorageKey) {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    return MmkvStorage.getBoolean(key);
  },
  getObject(key: UserStorageKey) {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    const data = MmkvStorage.getString(key);
    return data ? JSON.parse(data) : undefined;
  },
  get<K extends UserStorageKey, RT = UserStorageKeyValueType<K>>(key: K): RT | undefined {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    switch (key) {
      case UserStorageKey.FontFamily:
        return this.getString(key) as RT;
      case UserStorageKey.Fcm:
        return this.getObject(key) as RT;
      default:
        throw new Error('userStorage.get - 정의되지 않은 UserStorageKey!');
    }
  },
  remove(key: UserStorageKey | string) {
    if (!MmkvStorage) {
      throw new Error('user storage 가 초기화되지 않았습니다!');
    }

    MmkvStorage.delete(key);
  },

  /********************************************************************************************************************
   * 폰트
   * ******************************************************************************************************************/

  setFontFamily(fontFamily: FontFamily) {
    this.set(UserStorageKey.FontFamily, fontFamily);
  },

  getFontFamily() {
    return this.get(UserStorageKey.FontFamily) || FontFamily.Pretendard.name;
  },

  /********************************************************************************************************************
   * FCM 정보
   * ******************************************************************************************************************/

  setFcm(token: string, osVersion: string, buildNumber: string) {
    this.set(UserStorageKey.Fcm, {token, osVersion, buildNumber});
  },

  getFcm() {
    return this.get(UserStorageKey.Fcm);
  },

  removeFcm() {
    this.remove(UserStorageKey.Fcm);
  },
};

export default userStorage;
