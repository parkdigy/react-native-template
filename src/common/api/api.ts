import {type InternalAxiosRequestConfig} from 'axios';
import {type ApiOption, Api, ApiError, type ApiRequestData, type ApiRequestOption} from '@pdg/api';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {getBuildNumber, getModel, getManufacturerSync} from 'react-native-device-info';
import {type ApiResult} from './api.types';

const deviceModel = getModel();
const deviceManufacturer = getManufacturerSync();

export const API_BASE_URL =
  Platform.OS === 'android'
    ? (isEmulator ? Config.API_BASE_URL_SIMULATOR : Config.API_BASE_URL).replace('http://localhost', 'http://10.0.2.2')
    : isEmulator
    ? Config.API_BASE_URL_SIMULATOR
    : Config.API_BASE_URL;

export const API_AUTH_SIGN_IN_PATH = 'auth/signin';

export let API_AUTH_COOKIE_NAME = '';

let API_APP_KEY = '';
let API_INSTALL_APP_KEY = '';

function extractAuthKeyFromCookie(cookie: string) {
  const startChar = `${API_AUTH_COOKIE_NAME}=`;
  const endChar = ';';

  let startIndex = cookie.indexOf(startChar);
  while (startIndex !== -1) {
    const endIndex = cookie.indexOf(endChar, startIndex + 1);
    if (endIndex === -1) {
      break;
    }
    const authKey = cookie.substring(startIndex + startChar.length, endIndex).trim();
    if (notEmpty(authKey)) {
      return authKey;
    }
    startIndex = cookie.indexOf(startChar, endIndex + 1);
  }
}

const defaultOption: ApiOption = {
  baseUrl: API_BASE_URL,
  withCredentials: false,
  timeParamName: '__t__',
  async onRequest(config: InternalAxiosRequestConfig, baseUrl) {
    if (baseUrl === API_BASE_URL) {
      const authData = storage.getAuth();
      if (empty(config.headers.Cookie)) {
        config.headers.Cookie = `${API_AUTH_COOKIE_NAME}=${ifNullOrUndefined(authData?.authKey, '')};`;
      } else if (
        typeof config.headers.Cookie === 'string' &&
        !(config.headers.Cookie as string).includes(`${API_AUTH_COOKIE_NAME}=`)
      ) {
        (config.headers.Cookie as string) += `;${API_AUTH_COOKIE_NAME}=${ifNullOrUndefined(authData?.authKey, '')};`;
      }

      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }
    }

    return config;
  },

  async onResponse(res, config, baseUrl, path, requestData, requestOption) {
    if (baseUrl === API_BASE_URL) {
      const responseData = res.data;
      if (!requestOption?.raw) {
        if (!responseData || !responseData?.result) {
          throw new ApiError('예샹치 못한 오류가 발생했습니다.', 'API_ERR_NO_RESULT');
        }
        if (responseData.result.r) {
          // app.navigate(responseData.result.r);
        }
        if (responseData.result.ro) {
          // window.open(responseData.result.ro);
        }
        if (responseData.result.c !== 0) {
          throw new ApiError(responseData.result.m, `${responseData.result.c}`);
        } else {
          if (notEmpty(responseData.result.m)) {
            // app.showSuccessToast(responseData.result.m);
          }
          if (res.request.responseURL.split('?')[0] === `${API_BASE_URL}/${API_AUTH_SIGN_IN_PATH}`) {
            storage.removeAuth();
            const cookies = res.headers['set-cookie'];
            let foundAuthInfo = false;
            if (cookies) {
              for (const v of cookies) {
                const authKey = extractAuthKeyFromCookie(v);
                if (authKey) {
                  if (responseData.data?.auth) {
                    storage.setAuth({authData: responseData.data.auth, authKey});
                    foundAuthInfo = true;
                    break;
                  }
                }
              }
            }
            if (!foundAuthInfo) {
              app.getAppState()?.clearAuth();
            }
          }
        }
      }
      return responseData;
    } else {
      return res;
    }
  },

  onError(err: ApiError<ApiResult>) {
    const {silent} = err.requestOption || {};
    const data = err.response?.data;
    if (data && typeof data === 'object' && data.result) {
      if (data.result.c === 99997) {
        // 로그아웃 처리
        app.getAppState()?.clearAuth();
      } else if (!silent) {
        //
      }
    } else if (!silent) {
      //
    }
  },
};

const appendDefaultData = (data?: ApiRequestData) => {
  if (data instanceof FormData) {
    data.append('_env_', Config.APP_ENV);
    data.append('_ak_', API_APP_KEY);
    data.append('_iak_', API_INSTALL_APP_KEY);
    data.append('_os_', isIos ? 'ios' : isAndroid ? 'aos' : '');
    data.append('_os_v_', `${Platform.Version}`);
    data.append('_bn_', getBuildNumber());
    data.append('_dm_', deviceModel);
    data.append('_dmf_', deviceManufacturer);
    return data;
  } else {
    return {
      _env_: Config.APP_ENV,
      _ak_: API_APP_KEY,
      _iak_: API_INSTALL_APP_KEY,
      _os_: isIos ? 'ios' : isAndroid ? 'aos' : '',
      _os_v_: `${Platform.Version}`,
      _bn_: getBuildNumber(),
      _dm_: deviceModel,
      _dmf_: deviceManufacturer,
      ...data,
    };
  }
};

export default {
  _setAppKey(appKey: string) {
    API_APP_KEY = appKey;
  },
  _setInstallAppKey(installAppKey: string) {
    API_INSTALL_APP_KEY = installAppKey;
  },
  _setAuthCookieName(cookieName: string) {
    API_AUTH_COOKIE_NAME = cookieName;
  },

  get<T>(path: string, data?: ApiRequestData, option?: ApiRequestOption) {
    return new Api<T>(defaultOption).get(path, appendDefaultData(data), {
      ...option,
      silent: ifUndefined(option?.silent, true),
    });
  },
  post<T>(path: string, data?: ApiRequestData, option?: ApiRequestOption) {
    return new Api<T>(defaultOption).post(path, appendDefaultData(data), {
      ...option,
      silent: ifUndefined(option?.silent, true),
    });
  },
  patch<T>(path: string, data?: ApiRequestData, option?: ApiRequestOption) {
    return new Api<T>(defaultOption).patch(path, appendDefaultData(data), {
      ...option,
      silent: ifUndefined(option?.silent, true),
    });
  },
  delete<T>(path: string, data?: ApiRequestData, option?: ApiRequestOption) {
    return new Api<T>(defaultOption).delete(path, appendDefaultData(data), {
      ...option,
      silent: ifUndefined(option?.silent, true),
    });
  },

  Error: {
    Exception: 99999,
    Parameter: 99998,
    Unauthorized: 99997,
    Permission: 99996,
    NoDataChanged: 99995,
    NoData: 99994,
    Duplicate: 99993,
    InvalidPassword: 99992,
    InvalidAuthSignIn: 100,
  },
};

export function createApi<T>(option: Partial<ApiOption>) {
  return new Api<T>({...defaultOption, ...option});
}
