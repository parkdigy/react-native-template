import dayjs from 'dayjs';
import DeviceInfo from 'react-native-device-info';
import {type ConfigInfoData} from '@const';
import app, {AppStatus} from '@app';
import api from '@api';

interface Props {
  isInternetConnected: boolean;
  appStatus: AppStatus;
  onConfig(config: ConfigInfoData): void;
}

export const AppInitializer_Config = ({isInternetConnected, appStatus, onConfig}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const [, setReloadServerConfigTimeout] = useTimeoutRef();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const isServerConfigLoadedRef = useRef(false);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [serverConfigLoadUpdateKey, setServerConfigLoadUpdateKey] = useState(0);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const loadServerConfig = useCallback(async () => {
    if (isInternetConnected) {
      const {data} = await Const.Common.configInfo();

      storage.setConfig(data);
      storage.setServerDate(dayjs(data.dt).toDate());

      isServerConfigLoadedRef.current = true;

      return data;
    } else {
      throw new Error('No internet connection');
    }
  }, [isInternetConnected]);

  const loadConfig = useCallback(() => {
    const complete = (finalConfig: ConfigInfoData) => {
      api._setAuthCookieName(finalConfig.auth_cookie_name);

      onConfig(finalConfig);

      if (Number(DeviceInfo.getBuildNumber()) < finalConfig.app_required_build_number) {
        app.setAppStatus(app.AppStatus.RequiredAppUpdate);
      } else {
        app.nextAppStatus(AppStatus.ConfigLoading);
      }
    };

    loadServerConfig()
      .then((serverConfigData) => {
        complete(serverConfigData);
      })
      .catch(() => {
        app.setAppStatus(app.AppStatus.ConfigError);
        setServerConfigLoadUpdateKey((prev) => prev + 1);
      });
  }, [loadServerConfig, onConfig]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEventEffect(() => {
    if (appStatus === AppStatus.ConfigLoading) {
      loadConfig();
    }
  }, [appStatus]);

  useEventEffect(() => {
    if (!isServerConfigLoadedRef.current && serverConfigLoadUpdateKey > 0) {
      if (isInternetConnected) {
        setReloadServerConfigTimeout(() => {
          loadServerConfig()
            .then((serverConfigData) => {
              onConfig(serverConfigData);
            })
            .catch(() => {
              setServerConfigLoadUpdateKey((prev) => prev + 1);
            });
        }, 10000);
      } else {
        setReloadServerConfigTimeout(() => {
          setServerConfigLoadUpdateKey((prev) => prev + 1);
        }, 10000);
      }
    }
  }, [isInternetConnected, serverConfigLoadUpdateKey]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return null;
};
