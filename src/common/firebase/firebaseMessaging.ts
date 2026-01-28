import {
  AuthorizationStatus,
  type FirebaseMessagingTypes,
  getMessaging,
  setBackgroundMessageHandler as fbSetBackgroundMessageHandler,
  onNotificationOpenedApp as fbOnNotificationOpenedApp,
  getInitialNotification as fbGetInitialNotification,
  onMessage as fbOnMessage,
  hasPermission as fbHasPermission,
  requestPermission as fbRequestPermission,
  getToken as fbGetToken,
} from '@react-native-firebase/messaging';

const messaging = getMessaging();

export default {
  AuthorizationStatus,

  setBackgroundMessageHandler(handler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<any>) {
    fbSetBackgroundMessageHandler(messaging, handler);
  },
  onNotificationOpenedApp(listener: (message: FirebaseMessagingTypes.RemoteMessage) => any): () => void {
    return fbOnNotificationOpenedApp(messaging, listener);
  },
  getInitialNotification(): Promise<FirebaseMessagingTypes.RemoteMessage | null> {
    return fbGetInitialNotification(messaging);
  },
  onMessage(listener: (message: FirebaseMessagingTypes.RemoteMessage) => any): () => void {
    return fbOnMessage(messaging, listener);
  },
  hasPermission(): Promise<FirebaseMessagingTypes.AuthorizationStatus> {
    return fbHasPermission(messaging);
  },
  requestPermission(
    iosPermissions?: FirebaseMessagingTypes.IOSPermissions,
  ): Promise<FirebaseMessagingTypes.AuthorizationStatus> {
    return fbRequestPermission(messaging, iosPermissions);
  },
  getToken(
    options?: FirebaseMessagingTypes.GetTokenOptions & FirebaseMessagingTypes.NativeTokenOptions,
  ): Promise<string> {
    return fbGetToken(messaging, options);
  },
};
