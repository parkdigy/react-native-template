import {AppState, AppStateStatus, BackHandler, NativeEventSubscription} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import api from '@api';
import {ConfigInfoData} from '@const';

interface Props {
  config: ConfigInfoData;
  onChangeAppState(newAppState: AppStateStatus): void;
}

export const App_Effect = ({config, onChangeAppState}: Props) => {
  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 앱 상태 변경 이벤트 등록 */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      onChangeAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
   * Render
   * ******************************************************************************************************************/

  return null;
};

export default App_Effect;
