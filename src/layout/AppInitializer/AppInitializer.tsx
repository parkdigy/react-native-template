import BootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';
import {type ColorSchemeName, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import notifee, {AndroidNotificationSetting} from '@notifee/react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import NaverLogin from '@react-native-seoul/naver-login';
import Config from 'react-native-config';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import app, {AppStatus, useAppListener} from '@app';
import {type ConfigInfoData} from '@const';
import {type AppAuthInfo} from '@context';
import {FontFamily, type PermissionMap, type ScreenList} from '@types';
import api from '@api';
import App from '../App';
import {NavigationDarkTheme, NavigationLightTheme, PaperBlueDarkTheme, PaperBlueLightTheme} from '../../theme';
import {
  AppInitializer_Splash,
  AppInitializer_EasUpdate,
  AppInitializer_Auth,
  AppInitializer_Permission,
  AppInitializer_Config,
} from './controls';
import dayjs from 'dayjs';

// 개발용 : Cover Screen 강제 표시
const FORCE_SHOW_COVER_SCREEN = false;

const SHOW_APP_STATUS = [app.AppStatus.Initialized, app.AppStatus.AppSplashHiding, app.AppStatus.Main];

export const AppInitializer = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  // 앱 활성 상태
  const appStatus = useAppListener('appStatus');
  const navigationRef = useNavigationContainerRef<ScreenList>();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [detailLogTexts, setDetailLogTexts] = useState<string[]>([]);

  // 앱 상태
  const [localAppStatus, setLocalAppStatus] = useState<AppStatus>(appStatus);
  // 앱 KEY
  const [appKey, setAppKey] = useState<string>();
  // 설치 앱 KEY
  const [installAppKey, setInstallAppKey] = useState<string>();
  // 테마 (dark|red)
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(() => {
    const storageTheme = storage.getTheme();
    if (contains(['light', 'dark'], storageTheme)) {
      return storageTheme;
    } else {
      // return Appearance.getColorScheme();
      return 'light';
    }
  });
  // 설정 정보
  const [config, setConfig] = useState<ConfigInfoData>();
  // 오늘 날짜
  const [todayDate, setTodayDate] = useState<Date>();
  // 오늘 날짜 Val
  const [todayDateVal, setTodayDateVal] = useState<number>();
  // 인증 정보
  const [auth, setAuth] = useState<AppAuthInfo>();
  // App 컴포넌트 초기화 완료 여부
  const [componentReady, setComponentReady] = useState(false);
  // 인터넷 연결 여부
  const [isInternetConnected, setIsInternetConnected] = useState<boolean>(false);
  // 폰트
  const [fontFamily, setFontFamily] = useState<FontFamily>(FontFamily.Pretendard.name);
  // 권한
  const [permissionMap, setPermissionMap] = useState<PermissionMap>();
  // 알림 권한 여부
  const [hasNotificationPermission, setHasNotificationPermission] = useState<boolean>();
  // 운영자 모드 여부
  const [isOperatorMode, setIsOperatorMode] = useState(false);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  /** colorScheme 에 따른 화면 테마 */
  const theme = useMemo(() => {
    return colorScheme === 'dark' ? NavigationDarkTheme : NavigationLightTheme;
  }, [colorScheme]);

  /** colorScheme 에 따른 Paper 화면 테마 */
  const paperTheme = useMemo(() => {
    return colorScheme === 'dark' ? PaperBlueDarkTheme : PaperBlueLightTheme;
  }, [colorScheme]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 재설정 */
  const reset = useCallback((newAppStatus: AppStatus) => {
    setConfig(undefined);
    setTodayDate(undefined);
    setTodayDateVal(undefined);
    setAuth(undefined);
    setComponentReady(false);
    setFontFamily(FontFamily.Pretendard.name);
    setPermissionMap(undefined);
    app.setAppStatus(newAppStatus);
  }, []);

  /** 앱 재시작 */
  const restart = useCallback(() => {
    ll('AppInitializer.restart : 앱 재시작');

    // if (navigationRef.isReady()) {
    //   navigationRef.navigate('Home');
    // }

    reset(app.AppStatus.ConfigLoading);
  }, [reset]);

  /** 알림 권한 체크 */
  const checkNotificationPermission = useCallback(async () => {
    const permissionStatus = await firebase.messaging.hasPermission();

    const newHasPermission = !contains(
      [firebase.messaging.AuthorizationStatus.NOT_DETERMINED, firebase.messaging.AuthorizationStatus.DENIED],
      permissionStatus,
    );

    if (newHasPermission) {
      const settings = await notifee.getNotificationSettings();
      if (settings.android?.alarm === AndroidNotificationSetting.ENABLED) {
        setHasNotificationPermission(true);
      } else {
        setHasNotificationPermission(false);
      }
    } else {
      setHasNotificationPermission(false);
    }
  }, []);

  const addDetailLogText = useCallback((newDetailLogText: string) => {
    setDetailLogTexts((prev) => [...prev, newDetailLogText]);
  }, []);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 초기화 */
  useEventLayoutEffect(() => {
    app.setAppStatus(app.AppStatus.Initializing);

    // 앱 아이콘의 Badge Count 를 0 으로 설정
    notifee.setBadgeCount(0).then(() => {});
    // 네비게이션 바 색상 및 스타일 설정
    app.navigationBar.set(paperTheme.colors.background, colorScheme ? 'light' : 'dark');
    // BootSplash 화면 숨김
    BootSplash.hide({fade: true}).then(() => {});
    // 알림 권한 체크
    /** 초기화 */
    checkNotificationPermission().then(() => {});
    // 네트워크 연결 상태 변경 이벤트 리스너 등록
    let isFirstNetStatus = true;
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetConnected(state.isConnected !== false);
      // setIsInternetConnected(false);
      //
      // setTimeout(() => {
      //   setIsInternetConnected(true);
      // }, 5000);

      if (isFirstNetStatus) {
        isFirstNetStatus = false;
        app.nextAppStatus(app.AppStatus.Initializing);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /** 인터넷 연결 상태 변경 시 */
  useEffect(() => {
    ll('인터넷 연결 여부 : ', isInternetConnected);

    app.setIsInternetConnected(isInternetConnected);
  }, [isInternetConnected]);

  /** 앱 KEY, 설치 앱 KEY 초기화 */
  useEventLayoutEffect(() => {
    // 앱 KEY
    {
      const storageAppKey = storage.getAppKey();
      if (storageAppKey) {
        api._setAppKey(storageAppKey);
        setAppKey(storageAppKey);
      } else {
        const newAppKey = DeviceInfo.getUniqueIdSync().replaceAll('-', '');
        storage.setAppKey(newAppKey);
        api._setAppKey(newAppKey);
        setAppKey(newAppKey);
      }
    }
    // 설치 앱 KEY
    {
      const storageInstallAppKey = storage.getInstallAppKey();
      if (storageInstallAppKey) {
        api._setInstallAppKey(storageInstallAppKey);
        setInstallAppKey(storageInstallAppKey);
      } else {
        firebase.installations.getId().then((newInstallAppKey) => {
          storage.setInstallAppKey(newInstallAppKey);
          api._setInstallAppKey(newInstallAppKey);
          setInstallAppKey(newInstallAppKey);
        });
      }
    }
  }, []);

  /** 네이버 로그인 초기화 */
  useEffect(() => {
    NaverLogin.initialize({
      appName: Config.APP_TITLE,
      consumerKey: Config.NAVER_LOGIN_CLIENT_KEY,
      consumerSecret: Config.NAVER_LOGIN_CLIENT_SECRET,
      serviceUrlSchemeIOS: Config.NAVER_LOGIN_URL_SCHEME_IOS,
    });
  }, []);

  /** 설정 정보 변경 시, API 인증 쿠키 이름 설정 */
  useEffect(() => {
    if (config) {
      api._setAuthCookieName(config.auth_cookie_name);
    }
  }, [config]);

  /** 앱 상태 변경 시 */
  useEventEffect(() => {
    ll('AppInitializer - appStatusChange - ', appStatus);
    addDetailLogText(`AppInitializer - appStatusChange - ${appStatus}`);

    if (appStatus === app.AppStatus.EasUpdateDownloading) {
      // EasUpdate 다운로드중 상태로 변경 시

      // App 컴포넌트 초기화 완료 여부 초기화
      setComponentReady(false);

      nextTick(() => {
        // 네비게이션 바 색상 및 스타일 설정
        app.navigationBar.set(paperTheme.colors.background, 'light');
      });
    } else if (appStatus === app.AppStatus.RequiredAppUpdate) {
      // 앱 강제 업데이트 상태로 변경 시

      nextTick(() => {
        // 네비게이션 바 색상 및 스타일 설정
        app.navigationBar.set(paperTheme.colors.background, 'light');
      });
    } else if (appStatus === app.AppStatus.Initialized) {
      setDetailLogTexts([]);
    }

    switch (appStatus) {
      case app.AppStatus.PermissionChecking:
        {
          const newTodayDate = storage.getServerDate();
          setTodayDate(newTodayDate);
          setTodayDateVal(Number(dayjs(newTodayDate).format('YYYYMMDD')));
        }
        break;
      case app.AppStatus.AppSplashHiding:
      case app.AppStatus.Main:
        // 네비게이션 바 전체화면 모드 해제 (안드로이드만 해당)
        app.navigationBar.fullScreen(false);
        break;
      default:
        // 네비게이션 바 전체화면 모드 설정 (안드로이드만 해당)
        app.navigationBar.fullScreen(true);
        app.navigationBar.set(theme.colors.background, theme.dark ? 'light' : 'dark');
        break;
    }

    setLocalAppStatus(appStatus);
  }, [appStatus]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  /** 앱이 백그라운드에서 활성화 시 */
  const handleActiveFromBackground = useCallback(() => {
    // 앱 아이콘의 Badge Count 를 0 으로 설정
    notifee.setBadgeCount(0).then(() => {});
    // 알림 권한 체크
    checkNotificationPermission().then(() => {});
  }, [checkNotificationPermission]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  /** App 컴포넌트 로드 여부 */
  const showApp =
    !!appKey &&
    !!installAppKey &&
    !FORCE_SHOW_COVER_SCREEN &&
    contains(SHOW_APP_STATUS, localAppStatus) &&
    !!config &&
    !!todayDate &&
    !!todayDateVal &&
    !!auth &&
    !!permissionMap &&
    hasNotificationPermission !== undefined;

  /** Splash 화면 표시 여부 */
  const showCoverScreen = FORCE_SHOW_COVER_SCREEN || localAppStatus !== app.AppStatus.Main;

  if (!showApp && componentReady) {
    setComponentReady(false);
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef} theme={theme}>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider theme={paperTheme}>
            <SafeAreaProvider style={{backgroundColor: paperTheme.colors.splashBackground}}>
              <StatusBar barStyle='dark-content' backgroundColor={paperTheme.colors.background} translucent />

              {showApp && (
                <App
                  isInternetConnected={isInternetConnected}
                  isOperatorMode={isOperatorMode}
                  colorScheme={colorScheme}
                  initAuth={auth}
                  initConfig={config}
                  initTodayDate={todayDate}
                  initTodayDateVal={todayDateVal}
                  initPermissionMap={permissionMap}
                  initHasNotificationPermission={hasNotificationPermission}
                  initFontFamily={fontFamily}
                  setIsInternetConnected={setIsInternetConnected}
                  setIsOperatorMode={setIsOperatorMode}
                  onColorSchemeChange={setColorScheme}
                  onHasNotificationPermissionUpdate={setHasNotificationPermission}
                  onReady={() => setComponentReady(true)}
                  onRestart={restart}
                  onActiveFromBackground={handleActiveFromBackground}
                />
              )}

              <AppInitializer_Config
                appStatus={appStatus}
                isInternetConnected={isInternetConnected}
                onConfig={setConfig}
              />

              {appKey && installAppKey && localAppStatus === app.AppStatus.PermissionChecking && (
                <AppInitializer_Permission appStatus={localAppStatus} onResult={setPermissionMap} />
              )}

              {showCoverScreen && (
                <>
                  {showApp ? (
                    <StatusBar animated />
                  ) : (
                    <StatusBar animated barStyle='dark-content' backgroundColor={paperTheme.colors.background} />
                  )}

                  <AppInitializer_Splash
                    isInternetConnected={isInternetConnected}
                    appStatus={localAppStatus}
                    config={config}
                    detailLogTexts={detailLogTexts}
                    componentReady={showApp && componentReady}
                    onErrorRetry={() => {
                      app.setAppStatus(app.AppStatus.ConfigLoading);
                    }}
                  />
                </>
              )}

              {appKey && installAppKey && localAppStatus === app.AppStatus.EasUpdateChecking && (
                <AppInitializer_EasUpdate appStatus={localAppStatus} isInternetConnected={isInternetConnected} />
              )}

              {appKey && installAppKey && localAppStatus === app.AppStatus.AuthLoading && todayDateVal && (
                <AppInitializer_Auth
                  appStatus={localAppStatus}
                  isInternetConnected={isInternetConnected}
                  auth={auth}
                  onAuth={(newAuth) => {
                    setAuth(newAuth);
                    setFontFamily(storage.user.getFontFamily());
                  }}
                  onDetailLogText={addDetailLogText}
                />
              )}

              {/*{__DEV__ && (*/}
              {/*  <View position='absolute' bottom={90} right={5} backgroundColor='#00000090' borderRadius={50}>*/}
              {/*    <IconButton*/}
              {/*      icon={isInternetConnected ? 'wifi' : 'wifi-off'}*/}
              {/*      iconColor={isInternetConnected ? 'white' : '#ffffffaa'}*/}
              {/*      size={15}*/}
              {/*      onPress={() => setIsInternetConnected((prev) => !prev)}*/}
              {/*    />*/}
              {/*  </View>*/}
              {/*)}*/}
            </SafeAreaProvider>
          </ThemeProvider>
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppInitializer;
