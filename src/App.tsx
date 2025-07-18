/********************************************************************************************************************
 * App 컴포넌트
 * - src/AppEasUpdate.tsx 에서 사용
 * - AppContextProvider, GestureHandlerRootView, NavigationContainer, PaperProvider, ThemeProvider
 * ******************************************************************************************************************/

import React from 'react';
import {
  ColorSchemeName,
  Appearance,
  AppState,
  unstable_batchedUpdates,
  BackHandler,
  NativeEventSubscription,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import {getAuth} from '@react-native-firebase/auth';
import NaverLogin from '@react-native-seoul/naver-login';
import {logout as KakaoLogout} from '@react-native-seoul/kakao-login';
import {AppAuthInfo, AppContextProvider, AppContextValue, AppForceColorScheme} from '@context';
import {ConfigInfoData} from '@const';
import {api} from '@api';
import {DefaultLayout} from './layout';
import {FontFamily} from '@types';
import {useAppListener} from '@app';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import App_reloadFcmToken from './App_reloadFcmToken';

const firebaseAuth = getAuth();

interface Props {
  // 테마
  colorScheme: ColorSchemeName;
  // 초기 인증 정보
  initAuth?: AppAuthInfo;
  // 초기 설정 정보
  initConfig: ConfigInfoData;
  // 테마 변경
  onColorSchemeChange(colorScheme: ColorSchemeName): void;
  // 백그라운드에서 앱이 활성화 될 때 이벤트
  onActiveFromBackground?(): void;
  // 초기화 완료 이벤트
  onReady?(): void;
}

const App = ({colorScheme, initAuth, initConfig, onColorSchemeChange, onActiveFromBackground, onReady}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const lockScreen = useAppListener('lockScreen');

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  // 앱의 활성화 상태 Ref
  const appStateRef = useRef(AppState.currentState);
  // 마지막 로그인 상태 인증 정보 로드 시간 Ref
  const lastReloadAuthLoginDateRef = useRef(0);
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
  // 인증 정보
  const [auth, setAuth] = useState<AppAuthInfo | undefined>(initAuth);
  // 설정 정보
  const [config, setConfig] = useState<ConfigInfoData>(initConfig);
  // 폰트
  const [fontFamily, _setFontFamily] = useState<FontFamily>(storage.getFontFamily());
  // 광고 ID 가져오는 중인지 여부
  const [adidLoading, setAdidLoading] = useState(true);
  // 광고 ID
  const [adid, setAdid] = useState<string | null>(DEFAULT_ADID);
  // 강제 적용 테마 (light|dark|system)
  const [forceColorScheme, setForceColorScheme] = useState<AppForceColorScheme>(() => {
    const storageTheme = storage.getTheme();
    switch (storageTheme) {
      case 'light':
      case 'dark':
        return storageTheme;
      default:
        return 'system';
    }
  });

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const commonStackNavigationOptions = useMemo(() => {
    return {
      headerShown: false,
      gestureEnabled: !lockScreen,
    } as NativeStackNavigationOptions;
  }, [lockScreen]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 네이버 로그인 초기화 */
  useEffect(() => {
    NaverLogin.initialize({
      appName: Config.APP_TITLE,
      consumerKey: Config.NAVER_LOGIN_CLIENT_KEY,
      consumerSecret: Config.NAVER_LOGIN_CLIENT_SECRET,
      serviceUrlSchemeIOS: Config.NAVER_LOGIN_URL_SCHEME_IOS,
    });
  }, []);

  /** 앱 상태 변경 이벤트 등록 */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  /** 앱 강제 업데이트 여부 체크 */
  useEffect(() => {
    api._setAuthCookieName(config.auth_cookie_name);
    if (Number(DeviceInfo.getBuildNumber()) < config.app_required_build_number) {
      app.setAppStatus(app.AppStatus.RequiredAppUpdate);
    }
  }, [config]);

  /** 화면 잠금 상태에서 하드웨어 Back 버튼 무효화 처리 - 중요 API 호출 시 화면을 벗어나지 못하게 하기 위함 */
  useEffect(() => {
    let backHandler: NativeEventSubscription | undefined;

    const lockScreenHandler = (newLockScreen: boolean) => {
      if (backHandler) {
        backHandler.remove();
        backHandler = undefined;
      }
      if (newLockScreen) {
        backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
      }
    };
    app.addListener('lockScreen', lockScreenHandler);

    return () => {
      app.removeListener('lockScreen', lockScreenHandler);
      if (backHandler) {
        backHandler.remove();
        backHandler = undefined;
      }
    };
  }, []);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 폰트 설정 */
  const setFontFamily = useCallback((newFontFamily: FontFamily) => {
    _setFontFamily(newFontFamily);
    storage.setFontFamily(newFontFamily);
  }, []);

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
            await firebaseAuth.signOut();
            break;
        }
      } catch (err) {}
    }

    // storage 에서 인증 정보 삭제
    storage.removeAuth();
    setAuth(undefined);

    // FCM 토큰 삭제 API 호출 및 storage 에서 FCM 정보 삭제
    const fcmInfo = storage.getFcm();
    if (fcmInfo?.token) {
      if (!fcmTokenRemovingRef.current) {
        fcmTokenRemovingRef.current = true;
        Const.Common.removeFcm(fcmInfo.token)
          .then(() => {
            storage.removeFcm();
          })
          .finally(() => {
            fcmTokenRemovingRef.current = false;
          });
      }
    }
  }, [auth]);

  /** 인증 정보 재로드 */
  const reloadAuth = useCallback(
    (isLogin?: boolean): Promise<boolean> => {
      return new Promise(async (resolve) => {
        // storage 에서 인증 정보 로드
        const authData = storage.getAuth();
        if (authData) {
          // 인증 정보 로드 API 호출 함수
          const goLoad = (data?: {google_id_token?: string; apple_id_token?: string}) => {
            Const.Auth.info({is_login: !!isLogin, ...data})
              .then(({data: authInfo}) => {
                if (isLogin) {
                  // 로그인 상태 인증 정보 로드 시간을 현재 시간으로 저장
                  lastReloadAuthLoginDateRef.current = nowTime();
                }
                unstable_batchedUpdates(() => {
                  // 인증 정보 저장
                  if (authInfo.auth) {
                    setAuth(authInfo.auth);
                  } else {
                    clearAuth();
                  }
                  // 설정 정보 저장
                  setConfig(authInfo.config);

                  resolve(true);
                });
              })
              .catch(() => {
                resolve(false);
              });
          };

          if (contains(['GOOGLE', 'APPLE'], authData.authType)) {
            // 구글, 애플 로그인
            // Firebase 에서 idToken 을 가져옴
            const idToken = await firebaseAuth.currentUser?.getIdToken();
            if (idToken) {
              if (authData.authType === 'GOOGLE') {
                goLoad({google_id_token: idToken});
              } else if (authData.authType === 'APPLE') {
                goLoad({apple_id_token: idToken});
              }
            } else {
              clearAuth().then(() => {});
              resolve(true);
            }
          } else {
            // 일반, 카카오, 네이버 로그인
            goLoad();
          }
        } else {
          resolve(true);
        }
      });
    },
    [setAuth, clearAuth],
  );

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
    Const.Common.configInfo()
      .then(({data}) => setConfig(data))
      .catch(() => {
        //
      });
  }, []);

  /** FCM 토큰 재로드 */
  const reloadFcmToken = useCallback(
    async (openSettings?: boolean) => {
      if (fcmLoadingRef.current) {
        return false;
      }

      fcmLoadingRef.current = true;

      const result = await App_reloadFcmToken({
        openSettings,
        auth,
        appActiveFromInactivePastTime: appActiveFromInactivePastTimeRef.current,
      });

      fcmLoadingRef.current = false;

      return result;
    },
    [auth],
  );

  /********************************************************************************************************************
   * AppContext Value
   * ******************************************************************************************************************/

  /** AppContext 의 Value 설정 */
  const appStateValue: AppContextValue | undefined = useMemo(
    () => ({
      commonStackNavigationOptions,
      adid,
      setAdid,
      adidLoading,
      setAdidLoading,
      appState,
      auth,
      reloadAuth,
      setAuth,
      clearAuth,
      reloadFcmToken,
      config,
      setConfig,
      reloadConfig,
      fontFamily,
      setFontFamily,
      colorScheme,
      setColorScheme: onColorSchemeChange,
      toggleColorScheme,
      forceColorScheme,
      setForceColorScheme: changeForceColorScheme,
    }),
    [
      adid,
      adidLoading,
      appState,
      auth,
      changeForceColorScheme,
      clearAuth,
      colorScheme,
      commonStackNavigationOptions,
      config,
      fontFamily,
      forceColorScheme,
      onColorSchemeChange,
      reloadAuth,
      reloadConfig,
      reloadFcmToken,
      setFontFamily,
      toggleColorScheme,
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
    // 인증정보 재로드 - 마지막 인증정보 로드 후 1시간이 지나면 로그인 상태로 간주하여 재로드
    reloadAuth(nowTime() - lastReloadAuthLoginDateRef.current > 1000 * 60 * 60).then(() => {});
    onActiveFromBackground?.();
  }, [onActiveFromBackground, reloadAuth]);

  /** 비활성화에서 앱이 활성화 될 때 */
  const handleAppActiveFromInactive = useCallback((pastTime: number) => {
    appActiveFromInactivePastTimeRef.current = pastTime;
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <AppContextProvider value={appStateValue}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ActiveDetector
          onActiveFromBackground={handleActiveFromBackground}
          onAppActiveFromInactive={handleAppActiveFromInactive}
        />
        <DefaultLayout />
      </GestureHandlerRootView>
    </AppContextProvider>
  );
};

export default App;
