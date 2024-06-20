/********************************************************************************************************************
 * App 컴포넌트
 * - src/AppCodePush.tsx 에서 사용
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
  Linking,
  Platform,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import {ThemeProvider} from 'styled-components/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DeviceInfo, {getBuildNumber, getManufacturerSync, getModel} from 'react-native-device-info';
import Config from 'react-native-config';
import FirebaseAuth from '@react-native-firebase/auth';
import NaverLogin from '@react-native-seoul/naver-login';
import {logout as KakaoLogout} from '@react-native-seoul/kakao-login';
import {AppAuthInfo, AppContextProvider, AppContextValue, AppForceColorScheme} from '@context';
import storage from '@storage';
import {ConfigInfoData} from '@const';
import {api} from '@api';
import {NavigationLightTheme, NavigationDarkTheme, PaperBlueLightTheme, PaperBlueDarkTheme} from './theme';
import {DefaultLayout} from './layout';

interface Props {
  // 초기 인증 정보
  initAuth?: AppAuthInfo;
  // 초기 설정 정보
  initConfig: ConfigInfoData;
  // 백그라운드에서 앱이 활성화 될 때 이벤트
  onActiveFromBackground?(): void;
  // 초기화 완료 이벤트
  onReady?(): void;
}

const App = ({initAuth, initConfig, onActiveFromBackground, onReady}: Props) => {
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
  // 광고 ID 가져오는 중인지 여부
  const [adidLoading, setAdidLoading] = useState(true);
  // 광고 ID
  const [adid, setAdid] = useState<string | null>(DEFAULT_ADID);
  // 테마 (dark|red)
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>();
  // 강제 적용 테마 (light|dark|system)
  const [forceColorScheme, setForceColorScheme] = useState<AppForceColorScheme>();
  // 성인인증 성공 콜백
  const [onAdultAuthSuccess, setOnAdultAuthSuccess] = useState<() => void>();
  // 아임포트 본인인증 성공 콜백
  const [onImpCertificationSuccess, setOnImpCertificationSuccess] = useState<(impUid: string) => void>();

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

  /** 테마 적용 - 설정에서 선택한 테마가 있으면 적용하고, 아니면 시스템 테마 적용 */
  useEffect(() => {
    const theme = storage.getTheme();
    switch (theme) {
      case 'light':
      case 'dark':
        // 설정에서 선택한 테마 적용
        setColorScheme(theme);
        setForceColorScheme(theme);
        break;
      default:
        // 시스템 테마 적용
        setColorScheme(Appearance.getColorScheme());
        setForceColorScheme('system');
    }
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

    const lockScreenHandler = (lockScreen: boolean) => {
      if (backHandler) {
        backHandler.remove();
        backHandler = undefined;
      }
      if (lockScreen) {
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
            await FirebaseAuth().signOut();
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
            const idToken = await FirebaseAuth().currentUser?.getIdToken();
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

  /** 테마 변경 */
  const changeForceColorScheme = useCallback((newForceColorScheme: AppForceColorScheme) => {
    switch (newForceColorScheme) {
      case 'light':
      case 'dark':
        setColorScheme(newForceColorScheme);
        break;
      default:
        setColorScheme(Appearance.getColorScheme());
        break;
    }
    setForceColorScheme(newForceColorScheme);
    storage.set(storage.Key.Theme, newForceColorScheme);
  }, []);

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

      let result: boolean;

      if (auth?.user_key) {
        const getToken = async () => {
          try {
            let permissionStatus = await messaging().hasPermission();
            switch (permissionStatus) {
              case messaging.AuthorizationStatus.DENIED:
                if (isIos && openSettings) {
                  await Linking.openSettings();
                }
                return false;
              case messaging.AuthorizationStatus.NOT_DETERMINED:
                permissionStatus = await messaging().requestPermission();
                break;
            }

            switch (permissionStatus) {
              case messaging.AuthorizationStatus.AUTHORIZED:
              case messaging.AuthorizationStatus.PROVISIONAL:
                const fcmToken = await messaging().getToken();
                const osVersion = `${Platform.Version}`;
                const buildNumber = getBuildNumber();

                const storageFcmData = storage.getFcm();

                if (
                  storageFcmData?.token !== fcmToken ||
                  storageFcmData?.userKey !== auth.user_key ||
                  storageFcmData?.osVersion !== osVersion ||
                  storageFcmData?.buildNumber !== buildNumber
                ) {
                  await Const.My.addFcm({
                    token: fcmToken,
                    d_m: getModel(),
                    d_ma: getManufacturerSync(),
                  });

                  storage.setFcm(fcmToken, auth.user_key, osVersion, buildNumber);
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
      } else {
        result = false;
      }

      fcmLoadingRef.current = false;

      return result;
    },
    [auth],
  );

  /** 성인인증 성공 콜백 설정 */
  const finalSetOnAdultAuthSuccess = useCallback((onSuccess: (() => void) | undefined) => {
    setOnAdultAuthSuccess(() => onSuccess);
  }, []);

  /** 아임포트 본인인증 성공 콜백 설정 */
  const finalSetOnImpCertificationSuccess = useCallback((onSuccess: ((impUid: string) => void) | undefined) => {
    setOnImpCertificationSuccess(() => onSuccess);
  }, []);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  /** colorScheme 에 따른 테마 설정 */
  const theme = useMemo(() => {
    return colorScheme === 'dark' ? NavigationDarkTheme : NavigationLightTheme;
  }, [colorScheme]);

  /** colorScheme 에 따른 Paper 테마 설정 */
  const paperTheme = useMemo(() => {
    return colorScheme === 'dark' ? PaperBlueDarkTheme : PaperBlueLightTheme;
  }, [colorScheme]);

  /********************************************************************************************************************
   * AppContext Value
   * ******************************************************************************************************************/

  /** AppContext 의 Value 설정 */
  const appStateValue: AppContextValue | undefined = useMemo(
    () =>
      colorScheme && forceColorScheme
        ? {
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
            colorScheme,
            setColorScheme,
            forceColorScheme,
            setForceColorScheme: changeForceColorScheme,
            onAdultAuthSuccess,
            setOnAdultAuthSuccess: finalSetOnAdultAuthSuccess,
            onImpCertificationSuccess,
            setOnImpCertificationSuccess: finalSetOnImpCertificationSuccess,
          }
        : undefined,
    [
      adid,
      adidLoading,
      appState,
      auth,
      changeForceColorScheme,
      clearAuth,
      colorScheme,
      config,
      finalSetOnAdultAuthSuccess,
      finalSetOnImpCertificationSuccess,
      forceColorScheme,
      onAdultAuthSuccess,
      onImpCertificationSuccess,
      reloadAuth,
      reloadConfig,
      reloadFcmToken,
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
      onReady && onReady();
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
    onActiveFromBackground && onActiveFromBackground();
  }, [onActiveFromBackground, reloadAuth]);

  /** 비활성화에서 앱이 활성화 될 때 */
  const handleAppActiveFromInactive = useCallback((pastTime: number) => {
    appActiveFromInactivePastTimeRef.current = pastTime;
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return appStateValue ? (
    <AppContextProvider value={appStateValue}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer theme={theme}>
          <ActiveDetector
            onActiveFromBackground={handleActiveFromBackground}
            onAppActiveFromInactive={handleAppActiveFromInactive}
          />

          <PaperProvider theme={paperTheme}>
            <ThemeProvider theme={paperTheme}>
              <DefaultLayout />
            </ThemeProvider>
          </PaperProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppContextProvider>
  ) : null;
};

export default App;
