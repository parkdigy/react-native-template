/********************************************************************************************************************
 * EasUpdate 처리 컴포넌트
 * - src/AppContainer.tsx 에서 사용
 * - 앱 초기화 및 업데이트 처리 후 App 컴포넌트를 표시
 * ******************************************************************************************************************/

import React from 'react';
import {Appearance, ColorSchemeName, StatusBar, unstable_batchedUpdates} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider} from 'styled-components/native';
import FirebaseAuth from '@react-native-firebase/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import notifee from '@notifee/react-native';
import app, {useAppListener} from '@app';
import {ConfigInfoData} from '@const';
import {AppAuthInfo} from '@context';
import App from './App';
import {AppStatus} from './common/app/app.types';
import AppSplash from './AppSplash';
import {NavigationDarkTheme, NavigationLightTheme, PaperBlueDarkTheme, PaperBlueLightTheme} from './theme';

// 개발용 : Cover Screen 강제 표시
const FORCE_SHOW_COVER_SCREEN = false;

const AppEasUpdate = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  // 앱 활성 상태
  const appStatus = useAppListener('appStatus');

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 테마 (dark|red)
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(() => {
    const theme = storage.getTheme();
    switch (theme) {
      case 'dark':
      case 'light':
        return theme;
      default:
        return Appearance.getColorScheme();
    }
  });
  // 인증 정보
  const [auth, setAuth] = useState<AppAuthInfo>();
  // 설정 정보
  const [config, setConfig] = useState<ConfigInfoData>();
  // EasUpdate 업데이트 퍼센트
  const [updatingPercent, setUpdatingPercent] = useState(0);
  // App 컴포넌트 초기화 완료 여부
  const [componentReady, setComponentReady] = useState(false);

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
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (config) {
      api._setAuthCookieName(config.auth_cookie_name);
    }
  }, [config]);

  /** 초기화 */
  useLayoutEffect(() => {
    // 앱 아이콘의 Badge Count 를 0 으로 설정
    notifee.setBadgeCount(0).then(() => {});
    // 네비게이션 바 전체화면 모드 해제 (안드로이드만 해당)
    app.navigationBar.fullScreen(false);
    // 네비게이션 바 색상 및 스타일 설정
    app.navigationBar.set(paperTheme.colors.splashBackground, 'light');
    // BootSplash 화면 숨김
    BootSplash.hide({fade: true}).then(() => {});
    // 설정 정보 로드
    loadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 앱 상태 변경 시 */
  useEffect(() => {
    if (appStatus === app.AppStatus.EasUpdateDownloading) {
      // EasUpdate 다운로드중 상태로 변경 시

      // EasUpdate 업데이트 퍼센트 초기화
      setUpdatingPercent(0);
      // App 컴포넌트 초기화 완료 여부 초기화
      setComponentReady(false);

      nextTick(() => {
        // 네비게이션 바 전체화면 모드 해제 (안드로이드만 해당)
        app.navigationBar.fullScreen(false);
        // 네비게이션 바 색상 및 스타일 설정
        app.navigationBar.set(paperTheme.colors.splashBackground, 'light');
      });
    } else if (appStatus === app.AppStatus.RequiredAppUpdate) {
      // 앱 강제 업데이트 상태로 변경 시

      nextTick(() => {
        // 네비게이션 바 전체화면 모드 해제 (안드로이드만 해당)
        app.navigationBar.fullScreen(false);
        // 네비게이션 바 색상 및 스타일 설정
        app.navigationBar.set(paperTheme.colors.splashBackground, 'light');
      });
    }
  }, [appStatus, paperTheme.colors.splashBackground]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 인증 정보 로드 */
  const loadAuth = useCallback(async (callback?: (lastAppStatus: AppStatus) => void) => {
    // storage 에서 인증 정보 로드
    const authData = storage.getAuth();
    const runCallback = (lastAppStatus: AppStatus) => {
      if (callback) {
        nextTick(() => {
          callback(lastAppStatus);
        });
      }
    };

    if (authData) {
      // 인증 정보 로드 API 호출 함수
      const goLoadInfo = (data?: {google_id_token?: string; apple_id_token?: string}) => {
        Const.Auth.info({is_login: true, ...data})
          .then(({data: authInfo}) => {
            unstable_batchedUpdates(() => {
              // 인증 정보 설정
              if (authInfo.auth) {
                setAuth(authInfo.auth);
              } else {
                setAuth(undefined);
              }
              // 설정 정보 설정
              setConfig(authInfo.config);
            });

            nextTick(() => {
              // 앱 상태를 EasUpdate 체크 완료 상태로 변경
              app.setAppStatus(app.AppStatus.EasUpdateChecked);
              runCallback(app.AppStatus.EasUpdateChecked);
            });
          })
          .catch(() => {
            // 앱 상태를 에러 상태로 변경
            app.setAppStatus(app.AppStatus.LoadError);
          });
      };
      if (contains(['GOOGLE', 'APPLE'], authData.authType)) {
        // 구글, 애플 로그인
        // Firebase 에서 idToken 을 가져옴
        const idToken = await FirebaseAuth().currentUser?.getIdToken();
        if (idToken) {
          if (authData.authType === 'GOOGLE') {
            goLoadInfo({google_id_token: idToken});
          } else if (authData.authType === 'APPLE') {
            goLoadInfo({apple_id_token: idToken});
          }
        } else {
          // idToken 가져오기 실패 시, 앱 상태를 EasUpdate 체크 완료 상태로 변경
          app.setAppStatus(app.AppStatus.EasUpdateChecked);
          runCallback(app.AppStatus.EasUpdateChecked);
        }
      } else {
        // 일반, 카카오, 네이버 로그인
        goLoadInfo();
      }
    } else {
      // 인증 정보가 없을 경우, 앱 상태를 EasUpdate 체크 완료 상태로 변경
      app.setAppStatus(app.AppStatus.EasUpdateChecked);
      runCallback(app.AppStatus.EasUpdateChecked);
    }
  }, []);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 설정 정보 로드 */
  const loadConfig = useCallback(
    (delay?: boolean) => {
      // 앱 상태를 로드중 으로 변경
      app.setAppStatus(app.AppStatus.Loading);

      delayTimeout(
        () => {
          Const.Common.configInfo()
            .then(({data}) => {
              setConfig(data);

              // 앱 강제 업데이트 체크
              if (Number(DeviceInfo.getBuildNumber()) < data.app_required_build_number) {
                app.setAppStatus(app.AppStatus.RequiredAppUpdate);
              } else {
                loadAuth();
              }
            })
            .catch(() => {
              // 설정 정보 로드 에러
              app.setAppStatus(app.AppStatus.LoadError);
            });
        },
        delay ? 500 : 0,
      );
    },
    [loadAuth],
  );

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  /** 앱이 백그라운드에서 활성화 시 */
  const handleActiveFromBackground = useCallback(() => {
    // 앱 아이콘의 Badge Count 를 0 으로 설정
    notifee.setBadgeCount(0).then(() => {});
  }, []);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  /** App 컴포넌트 로드 여부 */
  const showApp = useMemo(
    () =>
      !FORCE_SHOW_COVER_SCREEN &&
      !contains(
        [
          app.AppStatus.Loading,
          app.AppStatus.LoadError,
          app.AppStatus.RequiredAppUpdate,
          app.AppStatus.EasUpdateDownloading,
          app.AppStatus.EasUpdateInstalling,
        ],
        appStatus,
      ),
    [appStatus],
  );

  /** Splash 화면 표시 여부 */
  const showCoverScreen = useMemo(
    () =>
      FORCE_SHOW_COVER_SCREEN ||
      contains(
        [
          app.AppStatus.Loading,
          app.AppStatus.LoadError,
          app.AppStatus.RequiredAppUpdate,
          app.AppStatus.EasUpdateDownloading,
          app.AppStatus.EasUpdateInstalling,
          app.AppStatus.EasUpdateChecked,
          app.AppStatus.AppSplashHiding,
        ],
        appStatus,
      ),
    [appStatus],
  );
  // const showCoverScreen = true;

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider theme={paperTheme}>
          <SafeAreaProvider style={{backgroundColor: paperTheme.colors.splashBackground}}>
            {showApp && config && (
              <App
                colorScheme={colorScheme}
                initAuth={auth}
                initConfig={config}
                onColorSchemeChange={setColorScheme}
                onReady={() => setComponentReady(true)}
                onActiveFromBackground={handleActiveFromBackground}
              />
            )}

            {showCoverScreen && (
              <>
                {showApp ? (
                  <StatusBar animated />
                ) : (
                  <StatusBar animated barStyle='light-content' backgroundColor={paperTheme.colors.splashBackground} />
                )}

                <AppSplash
                  config={config}
                  componentReady={componentReady}
                  updatingPercent={updatingPercent}
                  onErrorRetry={() => loadConfig(true)}
                />
              </>
            )}
          </SafeAreaProvider>
        </ThemeProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default AppEasUpdate;
