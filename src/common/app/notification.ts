import notifee, {AndroidImportance} from '@notifee/react-native';
import {type StackNavigationProp} from '@react-navigation/stack';

type NotificationData = Dict<string | object | number>;
let _initData: NotificationData | undefined;

export const notification = {
  setInitData(initData: NotificationData | undefined) {
    _initData = initData;
  },

  getInitData() {
    return _initData;
  },

  async show(body: string, title?: string, data?: Dict<string | object>) {
    await notifee.requestPermission();

    const channel = await notifee.createChannel({
      id: 'default',
      name: 'default channel',
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId: channel,
        smallIcon: 'ic_notification',
        color: '#2368E7',
        pressAction: {
          id: 'default',
        },
      },
    });
  },

  processData(navigation: StackNavigationProp<any>, data: Dict<string | object | number>) {
    // 화면 이동 처리
    const processScreen = (sData: {screen: string; screenData?: string}, delay = 0) => {
      const screen = sData.screen as string;
      const screenDataStr = sData.screenData as string | undefined;
      const screenData = screenDataStr ? JSON.parse(screenDataStr) : undefined;

      let finalDelay = delay;

      const screens = screen.split(',');
      screens.forEach((s, idx) => {
        finalDelay += (idx + 1) * 50;
        delayTimeout(() => {
          app.navigate(navigation, s as any, screenData);
        }, finalDelay);
      });

      return finalDelay;
    };

    let delay = 0;
    if (data.screen && typeof data.screen === 'string') {
      delay = processScreen({screen: data.screen, screenData: data.screenData as any}, delay);
    }
    if (data.screens && Array.isArray(data.screens)) {
      data.screens.forEach((sData) => {
        delay = processScreen(sData, delay);
      });
    }
  },
};

export default notification;
