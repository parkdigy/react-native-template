import React from 'react';
import Config from 'react-native-config';
import app, {useAppListener} from '@app';

const IsUse = Config.APP_ENV !== 'production';

export const AppLogText = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const appStatus = useAppListener('appStatus');

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 로그 텍스트 (개발, 스테이징 환경에서만 사용)
  const [logText, setLogText] = useState<string>();

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 앱 활성 상태 변경 시, 로그 텍스트 업데이트 (개발, 스테이징 환경에서만 사용) */
  useEffect(() => {
    if (IsUse) {
      let newLogText: string | undefined;
      switch (appStatus) {
        case app.AppStatus.Loading:
          newLogText = '로드중...';
          break;
        case app.AppStatus.LoadError:
          newLogText = '오류';
          break;
        case app.AppStatus.RequiredAppUpdate:
          newLogText = '업데이트 필요';
          break;
        case app.AppStatus.CodePushDownloading:
          newLogText = '업데이트 다운로드중...';
          break;
        case app.AppStatus.CodePushInstalling:
          newLogText = '업데이트 설치중...';
          break;
        case app.AppStatus.CodePushChecked:
          newLogText = '화면 그리는중...';
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
    <Text mt={10} fontSize={11} color={app.color.White}>
      {logText}
    </Text>
  ) : null;
};

export default AppLogText;
