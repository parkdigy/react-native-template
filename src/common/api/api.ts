import {type ApiOption, Api, type ApiRequestData, type ApiRequestOption} from '@pdg/api';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {getBuildNumber, getModel, getManufacturerSync} from 'react-native-device-info';
import defaultOption, {setAuthCookieName} from './defaultOption';
import error from './error';

const deviceModel = getModel();
const deviceManufacturer = getManufacturerSync();

let API_APP_KEY = '';
let API_INSTALL_APP_KEY = '';

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
  error,

  _setAppKey(appKey: string) {
    API_APP_KEY = appKey;
  },
  _setInstallAppKey(installAppKey: string) {
    API_INSTALL_APP_KEY = installAppKey;
  },
  _setAuthCookieName(cookieName: string) {
    setAuthCookieName(cookieName);
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
