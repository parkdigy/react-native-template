import app, {AppStatus} from '@app';
import {Text_Accent} from '@ccomp';

const IsUse = true;

interface Props {
  appStatus: AppStatus;
}

export const AppInitializer_LogText = ({appStatus}: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 로그 텍스트 (개발, 스테이징 환경에서만 사용)
  const [logText, setLogText] = useState<string>();

  /********************************************************************************************************************
   * Changed
   * ******************************************************************************************************************/

  /** 앱 활성 상태 변경 시, 로그 텍스트 업데이트 (개발, 스테이징 환경에서만 사용) */
  useChanged(() => {
    if (IsUse) {
      let newLogText: string | undefined;
      switch (appStatus) {
        case app.AppStatus.Initializing:
          newLogText = '시작 준비 중...';
          break;
        case app.AppStatus.ConfigLoading:
          newLogText = '설정 확인 중...';
          break;
        case app.AppStatus.ConfigError:
          newLogText = '설정 로드 오류';
          break;
        case app.AppStatus.RequiredAppUpdate:
          newLogText = '업데이트 필요';
          break;
        case app.AppStatus.EasUpdateChecking:
          newLogText = '업데이트 확인 중...';
          break;
        case app.AppStatus.EasUpdateDownloading:
          newLogText = '업데이트 설치 중...';
          break;
        case app.AppStatus.EasUpdateDownloadError:
          newLogText = '업데이트 오류';
          break;
        case app.AppStatus.EasUpdateInstalling:
          newLogText = '업데이트 설치 중...';
          break;
        case app.AppStatus.PermissionChecking:
          newLogText = '권한 확인 중...';
          break;
        case app.AppStatus.AuthLoading:
          newLogText = '인증 확인 중...';
          break;
        case app.AppStatus.AuthLoadError:
          newLogText = '인증 오류';
          break;
        case app.AppStatus.Initialized:
          newLogText = '화면 그리는 중...';
          break;
        case app.AppStatus.AppSplashHiding:
          newLogText = '.';
          break;
        case app.AppStatus.Main:
          newLogText = '...';
          break;
      }
      setLogText(newLogText);
    }
  }, [appStatus]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return logText ? (
    <Text_Accent s={11} mt={10} center>
      {logText}
    </Text_Accent>
  ) : null;
};

export default AppInitializer_LogText;
