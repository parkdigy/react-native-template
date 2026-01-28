import {type AppAuthInfo} from '@context';
import app, {AppStatus} from '@app';
import {AppInitializer_Auth_Content} from './AppInitializer_Auth_Content';
import type {StorageAuthInfo} from '@storage';

interface Props {
  appStatus: AppStatus;
  isInternetConnected: boolean;
  auth?: AppAuthInfo;
  onAuth(auth: AppAuthInfo): void;
  onDetailLogText(detailLogText: string): void;
}

export const AppInitializer_Auth = ({appStatus, auth, isInternetConnected, onAuth, onDetailLogText}: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [isShow, setIsShow] = useState(false);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const complete = useCallback(
    (authInfo: AppAuthInfo) => {
      onDetailLogText('complete');

      storage.user.init(authInfo.user_key);
      onAuth(authInfo);
      onDetailLogText(`complete - next - ${app.nextAppStatus(app.AppStatus.AuthLoading)}`);
    },
    [onAuth, onDetailLogText],
  );

  const showLogin = useCallback(() => {
    onDetailLogText('showLogin');

    storage.user.uninit();
    setIsShow(true);
  }, [onDetailLogText]);

  const loadAuth = useCallback(async () => {
    onDetailLogText('loadAuth');

    let storageAuthData: StorageAuthInfo | undefined;
    try {
      // storage 에서 인증 정보 로드
      storageAuthData = storage.getAuth();
    } catch {}

    if (!storageAuthData) {
      showLogin();
      return;
    }

    const storageAuthInfo = storageAuthData.authData;

    // 인증 정보 로드 API 호출 함수
    const goLoadInfo = (data?: {google_id_token?: string; apple_id_token?: string}) => {
      Const.Auth.info({is_login: true, ...data})
        .then(({data: serverAuthData}) => {
          if (serverAuthData.auth) {
            storage.user.init(serverAuthData.auth.user_key);
            complete(serverAuthData.auth);
          } else {
            storage.removeAuth();
            showLogin();
          }
        })
        .catch(() => {
          app.setAppStatus(app.AppStatus.AuthLoadError);
        });
    };

    if (contains(['GOOGLE', 'APPLE'], storageAuthInfo.reg_type)) {
      // 구글, 애플 로그인
      // Firebase 에서 idToken 을 가져옴
      const idToken = await firebase.auth.currentUser?.getIdToken().catch(() => undefined);

      if (!idToken) {
        showLogin();
        return;
      }

      if (storageAuthInfo.reg_type === 'GOOGLE') {
        goLoadInfo({google_id_token: idToken});
      } else if (storageAuthInfo.reg_type === 'APPLE') {
        goLoadInfo({apple_id_token: idToken});
      }
    } else {
      // 일반, 카카오, 네이버 로그인
      goLoadInfo();
    }
  }, [complete, onDetailLogText, showLogin]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEventEffect(() => {
    onDetailLogText(`init - ${appStatus}`);
    if (appStatus === app.AppStatus.AuthLoading) {
      if (auth) {
        storage.user.init(auth.user_key);
        onDetailLogText(`init - next - ${app.nextAppStatus(app.AppStatus.AuthLoading)}`);
      } else {
        loadAuth();
      }
    }
  }, [appStatus]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return isShow ? <AppInitializer_Auth_Content isInternetConnected={isInternetConnected} onSuccess={complete} /> : null;
};
