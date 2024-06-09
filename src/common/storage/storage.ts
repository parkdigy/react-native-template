import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthSigninType} from '@const';
import {StorageKey} from './storage.types';

const storage = {
  Key: StorageKey,

  async set(key: StorageKey, value: string) {
    await AsyncStorage.setItem(key, value);
  },
  async get(key: StorageKey): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  },
  async remove(key: StorageKey) {
    await AsyncStorage.removeItem(key);
  },

  /********************************************************************************************************************
   * 인증 정보
   * ******************************************************************************************************************/

  async setAuth(authType: AuthSigninType, authKey: string) {
    await this.set(StorageKey.Auth, JSON.stringify({authType: authType, authKey: authKey}));
  },

  async removeAuth() {
    await this.remove(StorageKey.Auth);
  },

  async getAuth() {
    return new Promise<{authType: AuthSigninType; authKey: string} | null>((resolve, reject) => {
      this.get(StorageKey.Auth)
        .then((data) => {
          if (data) {
            try {
              const authData = JSON.parse(data);
              resolve(authData);
            } catch (err) {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /********************************************************************************************************************
   * FCM 정보
   * ******************************************************************************************************************/

  async setFcm(token: string, userKey: string, osVersion: string, buildNumber: string) {
    await this.set(StorageKey.Fcm, JSON.stringify({token, userKey, osVersion, buildNumber}));
  },

  async getFcm() {
    return new Promise<{token: string; userKey: string; osVersion: string; buildNumber: string} | null>(
      (resolve, reject) => {
        this.get(StorageKey.Fcm)
          .then((data) => {
            if (data) {
              try {
                const authData = JSON.parse(data);
                resolve(authData);
              } catch (err) {
                resolve(null);
              }
            } else {
              resolve(null);
            }
          })
          .catch((err) => {
            reject(err);
          });
      },
    );
  },

  async removeFcm() {
    await this.remove(StorageKey.Fcm);
  },

  /********************************************************************************************************************
   * getData
   * ******************************************************************************************************************/

  async getData<T>(key: StorageKey): Promise<{data_key: number; items: T} | undefined> {
    try {
      const data = await this.get(key);
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
