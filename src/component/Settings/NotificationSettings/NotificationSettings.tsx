import React from 'react';
import {getMessaging, AuthorizationStatus} from '@react-native-firebase/messaging';
import {useAppState} from '@context';
import {NotificationSettingsProps as Props} from './NotificationSettings.types';

const messaging = getMessaging();

export const NotificationSettings = ({}: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const {auth, setAuth, reloadFcmToken} = useAppState();
  const [hasPushPermission, setHasPushPermission] = useState<boolean>();

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    messaging.hasPermission().then((permissionStatus) => {
      if (!contains([AuthorizationStatus.NOT_DETERMINED, AuthorizationStatus.DENIED], permissionStatus)) {
        setHasPushPermission(true);
      } else {
        setHasPushPermission(false);
      }
    });
  }, []);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [isPushNotification, setIsPushNotification] = useState(!!auth?.is_push_notification);
  const [isPushNotificationChanging, setIsPushNotificationChanging] = useState(false);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleIsPushNotificationChange = useCallback(
    (value: boolean) => {
      if (auth && value !== isPushNotification) {
        setIsPushNotificationChanging(true);
        setIsPushNotification(value);

        Const.My.editIsPushNotification(value)
          .then(() => {
            setAuth({...auth, is_push_notification: value});
          })
          .catch(() => {
            setIsPushNotification(isPushNotification);
          })
          .finally(() => {
            setIsPushNotificationChanging(false);
          });
      }
    },
    [auth, isPushNotification, setAuth],
  );

  const handleActiveChange = useCallback((active: boolean, pastTime: number) => {
    if (active && pastTime > 10) {
      messaging.hasPermission().then((permissionStatus) => {
        setHasPushPermission(
          !contains([AuthorizationStatus.NOT_DETERMINED, AuthorizationStatus.DENIED], permissionStatus),
        );
      });
    }
  }, []);

  const handleRequestMessagingPermissionPress = useCallback(() => {
    reloadFcmToken(true).then(() => {});
  }, [reloadFcmToken]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <>
      <ActiveDetector onChange={handleActiveChange} />

      <ContainerScrollView>
        {auth && (
          <>
            {/* Push 알림 설정 */}
            <View>
              <TRight100 lh={42}>Push 알림 설정</TRight100>
              {hasPushPermission !== undefined && (
                <>
                  {hasPushPermission ? (
                    <Stack row center justifyContent={'space-between'} height={42}>
                      <TAccent bold>알림 받기</TAccent>
                      <View alignItems='center' justifyContent='center'>
                        <FormSwitch
                          style={{opacity: isPushNotificationChanging ? 0.3 : undefined}}
                          disabled={isPushNotificationChanging}
                          value={isPushNotification}
                          onValueChange={handleIsPushNotificationChange}
                        />
                        {isPushNotificationChanging && (
                          <View position='absolute'>
                            <ActivityIndicator />
                          </View>
                        )}
                      </View>
                    </Stack>
                  ) : (
                    <>
                      <Button onPress={handleRequestMessagingPermissionPress}>알림 받기</Button>
                    </>
                  )}
                </>
              )}
            </View>
          </>
        )}
      </ContainerScrollView>
    </>
  );
};

export default NotificationSettings;
