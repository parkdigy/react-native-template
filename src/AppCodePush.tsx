/********************************************************************************************************************
 * CodePush 처리 컴포넌트
 * - src/AppContainer.tsx 에서 사용
 * - 앱 초기화 및 업데이트 처리 후 App 컴포넌트를 표시
 * ******************************************************************************************************************/

import React from 'react';
import codePush from 'react-native-code-push';
import {StatusBar, unstable_batchedUpdates} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import FirebaseAuth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import notifee from '@notifee/react-native';
import app, {useAppListener} from '@app';
import {ConfigInfoData} from '@const';
import {AppAuthInfo} from '@context';
import App from './App';
import {AppStatus} from './common/app/app.types';
import {api} from './common';
import AppSplash from './AppSplash';

let lastCodePushRunTime = 0;

// 개발용 : Cover Screen 강제 표시
const FORCE_SHOW_COVER_SCREEN = false;

const CODE_PUSH_TEST_DEPLOYMENT_KEY = isIos ? Config.TEST_CODE_PUSH_IOS_KEY : Config.TEST_CODE_PUSH_AND_KEY;
const CODE_PUSH_TEST_MODE = Config.TEST_CODE_PUSH === 'true' && notEmpty(CODE_PUSH_TEST_DEPLOYMENT_KEY) && __DEV__;

interface Props {
  // 네비게이션 바 높이
  navigationBarHeight: number;
}

let AppCodePush = ({}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  // 앱 활성 상태
  const appStatus = useAppListener('appStatus');

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  // codePushUpdate 실행중인지 여부 Ref
  const codePushUpdatingRef = useRef(false);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 인증 정보
  const [auth, setAuth] = useState<AppAuthInfo>();
  // 설정 정보
  const [config, setConfig] = useState<ConfigInfoData>();
  // CodePush 업데이트 퍼센트
  const [updatingPercent, setUpdatingPercent] = useState(0);
  // App 컴포넌트 초기화 완료 여부
  const [componentReady, setComponentReady] = useState(false);

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
    app.navigationBar.set(app.color.CoverScreenBackground, 'light');
    // BootSplash 화면 숨김
    BootSplash.hide({fade: true}).then(() => {});
    // 설정 정보 로드
    loadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 앱 상태 변경 시 */
  useEffect(() => {
    if (appStatus === app.AppStatus.CodePushDownloading) {
      // CodePush 다운로드중 상태로 변경 시

      // CodePush 업데이트 퍼센트 초기화
      setUpdatingPercent(0);
      // App 컴포넌트 초기화 완료 여부 초기화
      setComponentReady(false);

      nextTick(() => {
        // 네비게이션 바 전체화면 모드 해제 (안드로이드만 해당)
        app.navigationBar.fullScreen(false);
        // 네비게이션 바 색상 및 스타일 설정
        app.navigationBar.set(app.color.CoverScreenBackground, 'light');
      });
    } else if (appStatus === app.AppStatus.RequiredAppUpdate) {
      // 앱 강제 업데이트 상태로 변경 시

      nextTick(() => {
        // 네비게이션 바 전체화면 모드 해제 (안드로이드만 해당)
        app.navigationBar.fullScreen(false);
        // 네비게이션 바 색상 및 스타일 설정
        app.navigationBar.set(app.color.CoverScreenBackground, 'light');
      });
    }
  }, [appStatus]);

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
              // 앱 상태를 CodePush 체크 완료 상태로 변경
              app.setAppStatus(app.AppStatus.CodePushChecked);
              runCallback(app.AppStatus.CodePushChecked);
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
          // idToken 가져오기 실패 시, 앱 상태를 CodePush 체크 완료 상태로 변경
          app.setAppStatus(app.AppStatus.CodePushChecked);
          runCallback(app.AppStatus.CodePushChecked);
        }
      } else {
        // 일반, 카카오, 네이버 로그인
        goLoadInfo();
      }
    } else {
      // 인증 정보가 없을 경우, 앱 상태를 CodePush 체크 완료 상태로 변경
      app.setAppStatus(app.AppStatus.CodePushChecked);
      runCallback(app.AppStatus.CodePushChecked);
    }
  }, []);

  /********************************************************************************************************************
   * CodePush
   * ******************************************************************************************************************/

  /** CodePush 업데이트 체크/설치 */
  const codePushUpdate = useCallback(
    (forceAppStatus?: AppStatus, currentAppStatus?: AppStatus) => {
      if (codePushUpdatingRef.current) {
        return;
      }

      codePushUpdatingRef.current = true;

      // 최종 앱 상태
      const finalAppStatus = forceAppStatus || currentAppStatus || appStatus;
      // 현재 앱 상태
      if (!currentAppStatus) {
        currentAppStatus = finalAppStatus;
      }

      if (__DEV__ && !CODE_PUSH_TEST_MODE) {
        // 개발 환경이고, CodePush 테스트 모드가 아닌 경우
        if (finalAppStatus === app.AppStatus.Loading) {
          // 최종 앱 상태가 로드중 일 경우 인증 정보 로드
          loadAuth();
        }
        // CodePush 체크/설치을 하지 않음
        codePushUpdatingRef.current = false;
        return;
      }

      if (nowTime() - lastCodePushRunTime < 60000) {
        // 마지막 업데이트 체크/설치 시간후 1분이 지나지 않은 경우
        if (finalAppStatus === app.AppStatus.Loading) {
          // 최종 앱 상태가 로드중 일 경우 인증 정보 로드
          loadAuth();
        }
        // CodePush 체크/설치을 하지 않음
        codePushUpdatingRef.current = false;
        return;
      }

      // 마지막 업데이트 체크/설치 시간을 현재 시간으로 설정
      lastCodePushRunTime = nowTime();

      // 네트웍 등의 문제로 10초 동안 CodePush 체크/설치 응답이 없을 경우 처리를 위한 타이머
      const checkTimer = setTimeout(() => {
        if (!contains([app.AppStatus.CodePushDownloading, app.AppStatus.CodePushInstalling], currentAppStatus)) {
          // 현재 앱 상태가 CodePush 다운로드 중, CodePush 설치 중이 아닌 경우
          if (finalAppStatus === app.AppStatus.Loading) {
            // 최종 앱 상태가 로드중 일 경우 인증 정보 로드
            codePushUpdatingRef.current = false;
            loadAuth();
          }
        }
      }, 10000);

      // 인증 정보 로드 함수
      const goLoadAuth = () => {
        if (
          contains(
            [app.AppStatus.Loading, app.AppStatus.CodePushDownloading, app.AppStatus.CodePushInstalling],
            currentAppStatus,
          )
        ) {
          // 현재 앱 상태가 로드중, CodePush 다운로드중, CodePush 설치중 인 경우 인증 정보 로드
          loadAuth();
        }
      };

      ll('[CodePush] sync');

      codePush
        .checkForUpdate(CODE_PUSH_TEST_MODE ? CODE_PUSH_TEST_DEPLOYMENT_KEY : undefined)
        .then((remotePackage) => {
          clearTimeout(checkTimer);

          if (remotePackage) {
            // 업데이트 할 패키지가 있는 경우, 앱 상태를 CodePush 다운로드중 으로 변경하고, 패키지 다운로드 시작
            ll('[CodePush] downloading');
            currentAppStatus = app.AppStatus.CodePushDownloading;
            app.setAppStatus(app.AppStatus.CodePushDownloading);
            return remotePackage.download((progress) => {
              // 다운로드 진행 퍼센트 설정
              setUpdatingPercent((100 / progress.totalBytes) * progress.receivedBytes);
            });
          }
        })
        .then((localPackage) => {
          if (localPackage) {
            ll('[CodePush] installing');
            currentAppStatus = app.AppStatus.CodePushInstalling;
            app.setAppStatus(app.AppStatus.CodePushInstalling);
            return new Promise<boolean>((resolve, reject) => {
              localPackage
                .install(codePush.InstallMode.IMMEDIATE)
                .then(() => {
                  resolve(true);
                })
                .catch((err) => reject(err));
            });
          }
        })
        .then((updated) => {
          if (updated) {
            // 패키지가 업데이트 된 경우, 앱 재시작
            ll('[CodePush] restarting');
            codePush.restartApp();
          } else {
            // 패키지가 업데이트 되지 않은 경우, CodePush 에 앱 준비 완료 알림
            ll('[CodePush] notifying app ready');
            goLoadAuth();
            return codePush.notifyAppReady();
          }
        })
        .then((res) => {
          if (res) {
            // 업데이트 체크/설치 완료
            switch (res.status) {
              case codePush.DeploymentStatus.SUCCEEDED:
                ll('[CodePush] deployment status : succeeded');
                break;
              case codePush.DeploymentStatus.FAILED:
                ll('[CodePush] deployment status : failed!');
                break;
            }
          }
        })
        .catch((err) => {
          // CodePush 업데이트 체크/설치 에러 발생
          ll('[CodePush] error!', err);
          clearTimeout(checkTimer);
          goLoadAuth();
        })
        .finally(() => {
          codePushUpdatingRef.current = false;
        });
    },
    [appStatus, loadAuth],
  );

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
                codePush.getUpdateMetadata().then((metadata) => {
                  if (metadata) {
                    if (Number(metadata.label.replace(/[^\d]/g, '')) < data.code_push_required_release_number) {
                      codePushUpdate(app.AppStatus.Loading);
                    } else {
                      loadAuth((lastAppStatus: AppStatus) => {
                        codePushUpdate(undefined, lastAppStatus);
                      });
                    }
                  } else {
                    codePushUpdate(app.AppStatus.Loading);
                  }
                });
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
    [codePushUpdate, loadAuth],
  );

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  /** 앱이 백그라운드에서 활성화 시 */
  const handleActiveFromBackground = useCallback(() => {
    // 앱 아이콘의 Badge Count 를 0 으로 설정
    notifee.setBadgeCount(0).then(() => {});

    // 로드중, 앱 강제 업데이트 상태가 아닌 경우, CodePush 업데이트 체크/설치 실행
    if (
      !contains(
        [
          app.AppStatus.Loading,
          app.AppStatus.RequiredAppUpdate,
          app.AppStatus.CodePushDownloading,
          app.AppStatus.CodePushInstalling,
        ],
        appStatus,
      )
    ) {
      codePushUpdate();
    }
  }, [appStatus, codePushUpdate]);

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
          app.AppStatus.CodePushDownloading,
          app.AppStatus.CodePushInstalling,
        ],
        appStatus,
      ),
    [appStatus],
  );
  // const showApp = false;

  /** Splash 화면 표시 여부 */
  const showCoverScreen = useMemo(
    () =>
      FORCE_SHOW_COVER_SCREEN ||
      contains(
        [
          app.AppStatus.Loading,
          app.AppStatus.LoadError,
          app.AppStatus.RequiredAppUpdate,
          app.AppStatus.CodePushDownloading,
          app.AppStatus.CodePushInstalling,
          app.AppStatus.CodePushChecked,
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
    <>
      {showApp && config && (
        <>
          <App
            initAuth={auth}
            initConfig={config}
            onReady={() => setComponentReady(true)}
            onActiveFromBackground={handleActiveFromBackground}
          />
        </>
      )}

      {showCoverScreen && (
        <>
          {showApp ? (
            <StatusBar animated />
          ) : (
            <StatusBar animated barStyle='light-content' backgroundColor={app.color.CoverScreenBackground} />
          )}

          <AppSplash
            config={config}
            componentReady={componentReady}
            updatingPercent={updatingPercent}
            onErrorRetry={() => loadConfig(true)}
          />
        </>
      )}
    </>
  );
};

if (CODE_PUSH_TEST_MODE || !__DEV__) {
  AppCodePush = codePush({
    checkFrequency: codePush.CheckFrequency.MANUAL,
    installMode: codePush.InstallMode.IMMEDIATE,
  })(AppCodePush);
}

export default AppCodePush;
