/********************************************************************************************************************
 * App 컴포넌트
 * - AppContextProvider, GestureHandlerRootView, NavigationContainer, PaperProvider, ThemeProvider
 * ******************************************************************************************************************/

import React from 'react';
import {
  ColorSchemeName,
  Appearance,
  AppState,
  Linking,
  Platform,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
} from 'react-native';
import notifee, {AndroidNotificationSetting} from '@notifee/react-native';
import {getBuildNumber} from 'react-native-device-info';
import NaverLogin from '@react-native-seoul/naver-login';
import {logout as KakaoLogout} from '@react-native-seoul/kakao-login';
import NativePermission from 'react-native-permissions';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {AppAuthInfo, AppContextProvider, AppContextValue, AppForceColorScheme} from '@context';
import {ConfigInfoData} from '@const';
import {FontFamily, Permission, PermissionMap, PermissionStatus} from '@types';
import app, {useAppListener} from '@app';
import {DefaultLayout} from '../DefaultLayout';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {App_loadAuth} from './functions';
import {App_Effect} from './controls';
import {useAutoUpdateState} from '@pdg/react-hook';

interface Props {
  // 테마
  colorScheme: ColorSchemeName;
  // 초기 인증 정보
  initAuth: AppAuthInfo;
  // 초기 설정 정보
  initConfig: ConfigInfoData;
  // 초기 오늘 날짜
  initTodayDate: Date;
  // 초기 오늘 날짜 Val
  initTodayDateVal: number;
  // 초기 권한 정보
  initPermissionMap: PermissionMap;
  // 초기 알림 권한 여부
  initHasNotificationPermission: boolean;
  // 초기 폰트
  initFontFamily: FontFamily;
  // 인터넷 연결 여부
  isInternetConnected: boolean;
  // 운영자 모드 여부
  isOperatorMode: boolean;
  // 인터넷 연결 여부 설정
  setIsInternetConnected(isInternetConnected: boolean): void;
  // 운영자 모드 여부 설정
  setIsOperatorMode(isOperatorMode: boolean): void;
  // 테마 변경
  onColorSchemeChange(newColorScheme: ColorSchemeName): void;
  // 알림 권한 체크 요청
  onHasNotificationPermissionUpdate(hasPermission: boolean): void;
  // 백그라운드에서 앱이 활성화 될 때 이벤트
  onActiveFromBackground?(): void;
  // 초기화 완료 이벤트
  onReady(): void;
  // 재시작 이벤트
  onRestart(): void;
}

const App = ({
  colorScheme,
  initAuth,
  initConfig,
  initTodayDate,
  initTodayDateVal,
  initPermissionMap,
  initHasNotificationPermission,
  initFontFamily,
  isInternetConnected,
  isOperatorMode,
  setIsInternetConnected,
  setIsOperatorMode,
  onColorSchemeChange,
  onActiveFromBackground,
  onHasNotificationPermissionUpdate,
  onReady,
  onRestart,
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {height: safeAreaHeight} = useSafeAreaFrame();
  const lockScreen = useAppListener('lockScreen');

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  // 앱의 활성화 상태 Ref
  const appStateRef = useRef(AppState.currentState);
  // FCM 토큰 삭제 중인지 여부 Ref
  const fcmTokenRemovingRef = useRef(false);
  // FCM 토큰 로딩 중인지 여부 Ref
  const fcmLoadingRef = useRef(false);
  // 앱이 비활성화 상태에서 활성화 상태로 전환되었을 때의 시간 Ref
  const appActiveFromInactivePastTimeRef = useRef(0);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 앱의 활성화 상태
  const [appState, setAppState] = useState(appStateRef.current);
  // 탭 바 높이
  const [tabBarHeight, setTabBarHeight] = useState(0);
  // 광고 ID 가져오는 중인지 여부
  const [adidLoading, setAdidLoading] = useState(true);
  // 광고 ID
  const [adid, setAdid] = useState<string | null>(DEFAULT_ADID);
  // 인증 정보
  const [auth, setAuth] = useAutoUpdateState<AppAuthInfo>(initAuth);
  // 설정 정보
  const [config, setConfig] = useAutoUpdateState<ConfigInfoData>(initConfig);
  // 강제 적용 테마 (light|dark|system)
  const [forceColorScheme, setForceColorScheme] = useState<AppForceColorScheme>(() => {
    const storageTheme = storage.getTheme();
    switch (storageTheme) {
      case 'light':
      case 'dark':
        return storageTheme;
      default:
        return 'light';
    }
  });
  // 폰트
  const [fontFamily, _setFontFamily] = useAutoUpdateState<FontFamily>(initFontFamily);
  // 권한
  const [permissionMap, setPermissionMap] = useAutoUpdateState<PermissionMap>(initPermissionMap);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  /** 공통 Stack Navigation 옵션 */
  const commonStackNavigationOptions = useMemo(() => {
    return {
      headerShown: false,
      gestureEnabled: !lockScreen,
    } as NativeStackNavigationOptions;
  }, [lockScreen]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 초기화 */
  useEffect(() => {
    app.setLockScreen(false);
  }, []);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 폰트 설정 */
  const setFontFamily = useCallback(
    (newFontFamily: FontFamily) => {
      _setFontFamily(newFontFamily);
      storage.user.setFontFamily(newFontFamily);
    },
    [_setFontFamily],
  );

  /** 권한 요청 */
  const requestPermission = useCallback(
    (permission: Permission) => {
      switch (permissionMap[permission]) {
        case PermissionStatus.UNAVAILABLE:
        case PermissionStatus.LIMITED:
        case PermissionStatus.GRANTED:
          break;
        case PermissionStatus.BLOCKED:
          Linking.openSettings();
          break;
        case PermissionStatus.DENIED:
          NativePermission.request(permission).then((status) => {
            setPermissionMap((old) => ({...old, [permission]: status}));
          });
          break;
      }
    },
    [permissionMap, setPermissionMap],
  );

  /** 인증 정보 초기화 */
  const clearAuth = useCallback(async () => {
    if (auth) {
      try {
        switch (auth.reg_type) {
          case 'KAKAO':
            await KakaoLogout();
            break;
          case 'NAVER':
            await NaverLogin.logout();
            break;
          case 'GOOGLE':
          case 'APPLE':
            await firebase.auth.signOut();
            break;
        }
      } catch (err) {}

      // storage 에서 인증 정보 삭제
      storage.removeAuth();

      if (isInternetConnected) {
        // FCM 토큰 삭제 API 호출 및 storage 에서 FCM 정보 삭제
        const fcmInfo = storage.user.getFcm();
        if (fcmInfo?.token) {
          if (!fcmTokenRemovingRef.current) {
            fcmTokenRemovingRef.current = true;
            Const.Common.removeFcm(fcmInfo.token)
              .then(() => {
                storage.user.removeFcm();
              })
              .finally(() => {
                fcmTokenRemovingRef.current = false;
              });
          }
        }
      }

      onRestart();
    }
  }, [auth, isInternetConnected, onRestart]);

  /** 인증 정보 다시 로드 */
  const reloadAuth = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      if (isInternetConnected) {
        App_loadAuth({isInternetConnected, auth})
          .then((newAuthInfo) => {
            if (newAuthInfo) {
              setAuth(newAuthInfo);
              resolve();
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error('인터넷에 연결되어 있지 않습니다.'));
      }
    });
  }, [auth, isInternetConnected, setAuth]);

  /** 테마 토글 */
  const toggleColorScheme = useCallback(() => {
    onColorSchemeChange(colorScheme === 'light' ? 'dark' : 'light');
  }, [colorScheme, onColorSchemeChange]);

  /** 테마 변경 */
  const changeForceColorScheme = useCallback(
    (newForceColorScheme: AppForceColorScheme) => {
      switch (newForceColorScheme) {
        case 'light':
        case 'dark':
          onColorSchemeChange(newForceColorScheme);
          break;
        default:
          onColorSchemeChange(Appearance.getColorScheme());
          break;
      }
      setForceColorScheme(newForceColorScheme);
      storage.setTheme(newForceColorScheme);
    },
    [onColorSchemeChange],
  );

  /** 설정 정보 재로드 */
  const reloadConfig = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (isInternetConnected) {
        Const.Common.configInfo()
          .then(({data}) => {
            setConfig(data);
            resolve();
          })
          .catch((err) => reject(err));
      } else {
        resolve();
      }
    });
  }, [isInternetConnected, setConfig]);

  /** FCM 토큰 재로드 */
  const reloadFcmToken = useCallback(
    async (openSettings?: boolean) => {
      if (fcmLoadingRef.current) {
        return false;
      }

      fcmLoadingRef.current = true;

      let result: boolean;

      // if (auth?.user_key) {
      const getToken = async () => {
        try {
          let permissionStatus = await firebase.messaging.hasPermission();
          switch (permissionStatus) {
            case firebase.messaging.AuthorizationStatus.DENIED:
              if (isIos && openSettings) {
                await Linking.openSettings();
              }
              return false;
            case firebase.messaging.AuthorizationStatus.NOT_DETERMINED:
              permissionStatus = await firebase.messaging.requestPermission();
              break;
          }

          switch (permissionStatus) {
            case firebase.messaging.AuthorizationStatus.AUTHORIZED:
            case firebase.messaging.AuthorizationStatus.PROVISIONAL:
              if (isInternetConnected && auth?.user_key) {
                const fcmToken = await firebase.messaging.getToken();
                const osVersion = `${Platform.Version}`;
                const buildNumber = getBuildNumber();

                const storageFcmData = storage.user.getFcm();

                if (
                  storageFcmData?.token !== fcmToken ||
                  storageFcmData?.osVersion !== osVersion ||
                  storageFcmData?.buildNumber !== buildNumber
                ) {
                  await Const.My.addFcm({
                    token: fcmToken,
                  });

                  storage.user.setFcm(fcmToken, osVersion, buildNumber);
                }
              }
              return true;
            default:
              return false;
          }
        } catch (err) {
          ll(err);
          return false;
        }
      };

      if (isAndroid && Number(Platform.Version) >= 33) {
        const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

        if (status === 'never_ask_again') {
          if (openSettings && appActiveFromInactivePastTimeRef.current < 100) {
            await Linking.openSettings();
          }
          result = false;
        } else if (status === 'granted') {
          result = await getToken();
        } else {
          result = false;
        }
      } else {
        result = await getToken();
      }

      fcmLoadingRef.current = false;

      return result;
    },
    [auth, isInternetConnected],
  );

  /** 알림 권한 요청 */
  const requestNotificationPermission = useCallback(() => {
    reloadFcmToken(true).then((result) => {
      if (result) {
        notifee.getNotificationSettings().then((settings) => {
          if (settings.android?.alarm === AndroidNotificationSetting.ENABLED) {
            onHasNotificationPermissionUpdate(true);
          } else {
            notifee.openAlarmPermissionSettings().then(() => {});
          }
        });
      }
    });
  }, [onHasNotificationPermissionUpdate, reloadFcmToken]);

  /********************************************************************************************************************
   * AppContext Value
   * ******************************************************************************************************************/

  /** AppContext 의 Value 설정 */
  const appStateValue: AppContextValue | undefined = useMemo(
    () => ({
      commonStackNavigationOptions,
      isInternetConnected,
      setIsInternetConnected,
      isOperatorMode,
      setIsOperatorMode,
      adid,
      setAdid,
      adidLoading,
      setAdidLoading,
      appState,
      isUseFloatTabBar: false,
      tabBarHeight,
      setTabBarHeight,
      auth,
      setAuth,
      clearAuth,
      reloadAuth,
      reloadFcmToken,
      config,
      setConfig,
      reloadConfig,
      todayDate: initTodayDate,
      todayDateVal: initTodayDateVal,
      colorScheme,
      setColorScheme: onColorSchemeChange,
      forceColorScheme,
      toggleColorScheme,
      setForceColorScheme: changeForceColorScheme,
      isSmallScreen: safeAreaHeight < 680,
      fontFamily,
      setFontFamily,
      permissionMap,
      requestPermission,
      hasNotificationPermission: initHasNotificationPermission,
      requestNotificationPermission,
      restartApp: onRestart,
    }),
    [
      commonStackNavigationOptions,
      isInternetConnected,
      setIsInternetConnected,
      isOperatorMode,
      setIsOperatorMode,
      adid,
      adidLoading,
      appState,
      tabBarHeight,
      auth,
      setAuth,
      clearAuth,
      reloadAuth,
      reloadFcmToken,
      config,
      setConfig,
      reloadConfig,
      initTodayDate,
      initTodayDateVal,
      colorScheme,
      onColorSchemeChange,
      forceColorScheme,
      toggleColorScheme,
      changeForceColorScheme,
      safeAreaHeight,
      fontFamily,
      setFontFamily,
      permissionMap,
      requestPermission,
      initHasNotificationPermission,
      requestNotificationPermission,
      onRestart,
    ],
  );

  /** AppContext 의 Value 를 Global 로 사용할 수 있도록 app 에 설정 */
  useEffect(() => {
    if (appStateValue) {
      app.setAppState(appStateValue);
    }
  }, [appStateValue]);

  /** 초기화 후 onReady 이벤트 호출 */
  useEffect(() => {
    nextTick(() => {
      onReady?.();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  /** 백그라운드에서 앱이 활성화 될 때 */
  const handleActiveFromBackground = useCallback(() => {
    onActiveFromBackground?.();
  }, [onActiveFromBackground]);

  /** 비활성화에서 앱이 활성화 될 때 */
  const handleAppActiveFromInactive = useCallback((pastTime: number) => {
    appActiveFromInactivePastTimeRef.current = pastTime;
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <AppContextProvider value={appStateValue}>
      <ActiveDetector
        onActiveFromBackground={handleActiveFromBackground}
        onAppActiveFromInactive={handleAppActiveFromInactive}
      />
      <DefaultLayout />

      <App_Effect config={config} onChangeAppState={setAppState} />
    </AppContextProvider>
  );
};

export default App;
// export default withIAPContext(App);
