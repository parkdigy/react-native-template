import RNFS from 'react-native-fs';
import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV({id: 'cache_files'});

const CACHE_DIR = `${RNFS.CachesDirectoryPath}/app_managed`;

RNFS.exists(CACHE_DIR).then((exists) => {
  if (!exists) {
    RNFS.mkdir(CACHE_DIR).then(() => {
      ll('캐시 디렉토리 생성 완료!');
    });
  }
});

const MAX_FILE_AGE = 1000 * 60 * 60 * 24 * 3; // 3일

export default {
  directory: CACHE_DIR,

  save(uri: string) {
    update(uri);
  },

  read(uri: string) {
    update(uri);
  },

  async clean() {
    ll('캐시 파일 정리 시작');
    for (const key of mmkv.getAllKeys()) {
      const time = mmkv.getNumber(key);
      if (time) {
        if (nowTime() - time > MAX_FILE_AGE) {
          // 3일 이상 지난 경우
          const uri = getUri(key);
          if (await RNFS.exists(uri)) {
            ll('캐시 파일 삭제:', uri);
            await RNFS.unlink(uri);
          }
          mmkv.delete(key);
        }
      } else {
        const uri = getUri(key);
        if (await RNFS.exists(uri)) {
          ll('캐시 파일 삭제:', uri);
          await RNFS.unlink(uri);
        }
        mmkv.delete(key);
      }
    }
    ll('캐시 파일 정리 완료');
  },
};

/********************************************************************************************************************
 * getKey
 * ******************************************************************************************************************/
function getKey(uri: string) {
  return uri.startsWith(CACHE_DIR) ? `$${uri.substring(CACHE_DIR.length)}` : uri;
}

/********************************************************************************************************************
 * getUri
 * ******************************************************************************************************************/
function getUri(key: string) {
  return key.startsWith('$') ? `${CACHE_DIR}${key.substring(1)}` : key;
}

/********************************************************************************************************************
 * update
 * ******************************************************************************************************************/
function update(uri: string) {
  RNFS.exists(uri).then((exists) => {
    if (exists) {
      const key = getKey(uri);
      const value = mmkv.getNumber(key);
      if (value && nowTime() - value > 1000 * 60 * 60) {
        // 1시간 이상 지난 경우
        mmkv.set(key, nowTime());
      }
    }
  });
}
