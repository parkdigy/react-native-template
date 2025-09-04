import React, {useLayoutEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

firebase.messaging.setBackgroundMessageHandler(async () => {
  // 앱이 종료되어 있을 떄 이벤트 수신
});

notifee.onBackgroundEvent(async () => {
  // 앱이 종료되어 있을 떄 이벤트 수신
});

function HeadlessCheck({isHeadless}) {
  const [notificationData, setNotificationData] = useState(undefined);

  useLayoutEffect(() => {
    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;

      if (notification && (type === EventType.PRESS || type === EventType.ACTION_PRESS)) {
        if (notification.data) {
          setNotificationData(notification.data);
        }

        if (notification.id) {
          await notifee.cancelNotification(notification.id);
        }
      }
    });
  }, []);

  if (isHeadless) {
    return null;
  }

  return <App notificationData={notificationData} />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
