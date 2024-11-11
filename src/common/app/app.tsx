import {StackNavigationProp} from '@react-navigation/stack';
import Config from 'react-native-config';
import {Linking, NativeModules} from 'react-native';
import {API_BASE_URL, ApiResult} from '@api';
import {AppContextValue} from '@context';
import {ConfigInfoData} from '@const';
import {MainTabScreenList, TNativeModules} from '@types';
import navigate from './navigate';
import navigationBar from './navigationBar';
import version from './version';
import notification from './notification';
import {
  AppListenerLockScreenCallback,
  AppListenerName,
  AppListenerAppStatusCallback,
  AppListeners,
  AppListenerValue,
  AppStatus,
  AppListenerTabRePressCallback,
} from './app.types';

const {RNUtilModule} = NativeModules as TNativeModules;

const _extraParam: Dict<Dict> = {};
let _appState: AppContextValue | undefined;
let _lockScreen = false;
let _appStatus: AppStatus = AppStatus.Loading;
let _tabRePressName: keyof MainTabScreenList = 'MainTabHome';
const _listeners: AppListeners = {
  appStatus: [],
  lockScreen: [],
  tabRePress: [],
};

const app = {
  RefreshTime: __DEV__ ? 60000 : 3600000,
  AppStatus,

  navigationBar,
  version,
  notification,

  nativeUtil: RNUtilModule,

  /********************************************************************************************************************
   * 앱 공통 리스너
   * ******************************************************************************************************************/

  addListener<
    Name extends AppListenerName,
    Callback = Name extends 'lockScreen'
      ? AppListenerLockScreenCallback
      : Name extends 'appStatus'
      ? AppListenerAppStatusCallback
      : Name extends 'tabRePress'
      ? AppListenerTabRePressCallback
      : never,
  >(name: Name, callback: Callback) {
    switch (name) {
      case 'appStatus':
        _listeners.appStatus.push(callback as AppListenerAppStatusCallback);
        break;
      case 'lockScreen':
        _listeners.lockScreen.push(callback as AppListenerLockScreenCallback);
        break;
      case 'tabRePress':
        _listeners.tabRePress.push(callback as AppListenerTabRePressCallback);
        break;
    }
  },

  removeListener<
    Name extends AppListenerName,
    Callback = Name extends 'lockScreen'
      ? AppListenerLockScreenCallback
      : Name extends 'appStatus'
      ? AppListenerAppStatusCallback
      : Name extends 'tabRePress'
      ? AppListenerTabRePressCallback
      : never,
  >(name: Name, callback: Callback) {
    _listeners[name] = (_listeners[name] as []).filter((c) => c !== callback) as any;
  },

  getListenerValue<Name extends AppListenerName, Value = AppListenerValue<Name>>(name: Name): Value {
    switch (name) {
      case 'lockScreen':
        return _lockScreen as Value;
      case 'appStatus':
        return _appStatus as Value;
      case 'tabRePress':
        return _tabRePressName as Value;
      default:
        throw new Error('[app.getListenerValue] invalid name!');
    }
  },

  /********************************************************************************************************************
   * 앱 상태
   * ******************************************************************************************************************/
  setAppStatus(appStatus: AppStatus) {
    _appStatus = appStatus;
    _listeners.appStatus.forEach((c) => c(appStatus));
  },

  /********************************************************************************************************************
   * AppContext Value
   * ******************************************************************************************************************/

  getAppState() {
    return _appState;
  },

  setAppState(appState: AppContextValue) {
    _appState = appState;
  },

  /********************************************************************************************************************
   * 화면 이동
   * ******************************************************************************************************************/

  navigate,

  /********************************************************************************************************************
   * 광고 ID
   * ******************************************************************************************************************/

  getFinalAdid(deviceAdid: string | null) {
    if (deviceAdid && deviceAdid.length === 36) {
      return (isEmulator ? (isIos ? Config.TEST_IOS_ADID : Config.TEST_AOS_ADID) : deviceAdid) || deviceAdid;
    } else {
      return DEFAULT_ADID;
    }
  },

  /********************************************************************************************************************
   * 앱 마켓 오픈
   * ******************************************************************************************************************/

  /** 구글플레이, 앱스토어 오픈 */
  async openMarketStore(config?: ConfigInfoData) {
    const url = config?.market_url || this.getAppState()?.config?.market_url;
    if (url) {
      await Linking.openURL(url);
    }
  },

  /********************************************************************************************************************
   * 모달 닫기
   * ******************************************************************************************************************/

  closeModal(navigation: StackNavigationProp<any>) {
    navigation.getParent()?.goBack();
  },

  /********************************************************************************************************************
   * 화면 전환 시 사용 할 추가 파라미터
   * ******************************************************************************************************************/

  addExtraParam(id: string, param: Dict) {
    _extraParam[id] = param;
  },

  removeExtraParam(id: string) {
    delete _extraParam[id];
  },

  getExtraParam(id: string): Dict | undefined {
    return _extraParam[id];
  },

  /********************************************************************************************************************
   * 화면 잠급 설정
   * ******************************************************************************************************************/

  setLockScreen(lockScreen: boolean) {
    _lockScreen = lockScreen;
    _listeners.lockScreen.forEach((c) => {
      c(lockScreen);
    });
  },

  getLockScreen() {
    return _lockScreen;
  },

  /********************************************************************************************************************
   * 활성화 된 탭 다시 클릭
   * ******************************************************************************************************************/

  tabRePress(tabName: keyof MainTabScreenList) {
    _tabRePressName = tabName;
    _listeners.tabRePress.forEach((c) => {
      c(tabName);
    });
  },

  /********************************************************************************************************************
   * API Base URL
   * ******************************************************************************************************************/

  getApiBaseUrl() {
    return API_BASE_URL;
  },

  /********************************************************************************************************************
   * Axios
   * ******************************************************************************************************************/

  getAxiosApiErrorResult(err: any): ApiResult['result'] | undefined {
    return err.response?.data?.result;
  },

  getAxiosApiErrorResultCode(err: any): ApiResult['result']['c'] | undefined {
    return err.response?.data?.result?.c;
  },

  getAxiosApiErrorResultMessage(err: any): ApiResult['result']['m'] | undefined {
    const result = this.getAxiosApiErrorResult(err);
    if (result) {
      return result.m;
    } else {
      return err.message;
    }
  },

  getAxiosApiErrorResultError(err: any): ApiResult['result']['e'] | undefined {
    return err.response?.data?.result?.e;
  },
};

export default app;
