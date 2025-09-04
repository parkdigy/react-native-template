import * as Updates from 'expo-updates';
import Config from 'react-native-config';
import app, {AppStatus} from '@app';

interface Props {
  appStatus: AppStatus;
  isInternetConnected: boolean;
}

const SKIP_UPDATE_ID = isIos ? Config.IOS_EAS_SKIN_UPDATE_ID : Config.AOS_EAS_SKIN_UPDATE_ID;

export const AppInitializer_EasUpdate = ({appStatus, isInternetConnected}: Props) => {
  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (appStatus === app.AppStatus.EasUpdateChecking) {
      checkUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStatus]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 업데이트 확인 */
  const checkUpdate = useCallback(() => {
    if (__DEV__ || !isInternetConnected || !Updates.isEnabled) {
      // 개발 환경, 오프라인, 업데이트 비활성화 된 경우
      app.nextAppStatus(app.AppStatus.EasUpdateChecking);
    } else {
      Updates.checkForUpdateAsync()
        .then((checkResult) => {
          if (checkResult.isAvailable || checkResult.isRollBackToEmbedded) {
            if (!checkResult.isRollBackToEmbedded && checkResult.manifest.id === SKIP_UPDATE_ID) {
              app.nextAppStatus(app.AppStatus.EasUpdateChecking);
            } else {
              app.setAppStatus(app.AppStatus.EasUpdateDownloading);
              Updates.fetchUpdateAsync()
                .then((fetchResult) => {
                  if (!fetchResult.isNew && !fetchResult.isRollBackToEmbedded) {
                    // 업데이트 다운로드 오류
                    app.setAppStatus(app.AppStatus.EasUpdateDownloadError);
                  } else {
                    // 업데이트 다운로드 완료
                    app.setAppStatus(app.AppStatus.EasUpdateInstalling);
                    Updates.reloadAsync();
                  }
                })
                .catch(() => {
                  app.setAppStatus(app.AppStatus.EasUpdateDownloadError);
                });
            }
          } else {
            app.nextAppStatus(app.AppStatus.EasUpdateChecking);
          }
        })
        .catch(() => {
          app.nextAppStatus(app.AppStatus.EasUpdateChecking);
        });
    }
  }, [isInternetConnected]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return null;
};
