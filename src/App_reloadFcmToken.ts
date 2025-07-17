import {AuthorizationStatus, getMessaging} from '@react-native-firebase/messaging';
import {
  Linking,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {getBuildNumber, getManufacturerSync, getModel} from 'react-native-device-info';
import {AppAuthInfo} from '@context';

const messaging = getMessaging();

export default async function App_reloadFcmToken({
  openSettings,
  auth,
  appActiveFromInactivePastTime,
}: {
  openSettings?: boolean;
  auth?: AppAuthInfo;
  appActiveFromInactivePastTime: number;
}) {
  let result: boolean;

  if (auth?.user_key) {
    const getToken = async () => {
      try {
        let permissionStatus = await messaging.hasPermission();
        switch (permissionStatus) {
          case AuthorizationStatus.DENIED:
            if (isIos && openSettings) {
              await Linking.openSettings();
            }
            return false;
          case AuthorizationStatus.NOT_DETERMINED:
            permissionStatus = await messaging.requestPermission();
            break;
        }

        switch (permissionStatus) {
          case AuthorizationStatus.AUTHORIZED:
          case AuthorizationStatus.PROVISIONAL:
            const fcmToken = await messaging.getToken();
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
        le(err);
        return false;
      }
    };

    if (isAndroid && Number(Platform.Version) >= 33) {
      const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

      if (status === 'never_ask_again') {
        if (openSettings && appActiveFromInactivePastTime < 100) {
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

  return result;
}
