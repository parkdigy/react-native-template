/********************************************************************************************************************
 * 메인 스택 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {unstable_batchedUpdates} from 'react-native';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {AdvertisingStatus, MainScreenList, ScreenProps} from '@types';
import {HeaderAppbar} from '@ccomp';
import {useAppListener} from '@app';
import {useAppState} from '@context';
import {MyNicknameChangeScreen, MyResignFormScreen} from '@screen';
import AuthStack from '../AuthStack';
import MainTab from './MainTab';
import {Fcm} from './controls';

const Stack = createNativeStackNavigator<MainScreenList>();

const MainStack = ({navigation}: ScreenProps) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {commonStackNavigationOptions, auth, adid, setAdid, setAdidLoading, reloadAuth} = useAppState();
  const lockScreen = useAppListener('lockScreen');

  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    if (auth) {
      if (navigation.getState().index > 0) {
        navigation.popToTop();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const loadAdid = useCallback(() => {
    setAdidLoading(true);

    const applyAdId = () => {
      app.nativeUtil
        .getAdvertisingInfo()
        .then((res) => {
          unstable_batchedUpdates(() => {
            setAdid(res.isAdTrackingLimited ? DEFAULT_ADID : app.getFinalAdid(res.id));
            setAdidLoading(false);
          });
        })
        .catch(() => {
          unstable_batchedUpdates(() => {
            setAdid(DEFAULT_ADID);
            setAdidLoading(false);
          });
        });
    };

    if (isAndroid) {
      applyAdId();
    } else if (isIos) {
      app.nativeUtil.getAdvertisingStatus().then((status) => {
        if (status === AdvertisingStatus.Authorized) {
          applyAdId();
        } else {
          setAdidLoading(false);
        }
      });
    }
  }, [setAdid, setAdidLoading]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    const initData = app.notification.getInitData();
    if (initData) {
      app.notification.processData(navigation, initData);
      app.notification.setInitData(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage.data) {
        app.notification.processData(navigation, remoteMessage.data);
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage && remoteMessage.data) {
          app.notification.processData(navigation, remoteMessage.data);
        }
      });

    const unsubscribeList: (() => void)[] = [];

    unsubscribeList.push(
      notifee.onForegroundEvent(({type, detail}) => {
        switch (type) {
          case EventType.PRESS:
          case EventType.ACTION_PRESS:
            if (detail.notification?.data) {
              app.notification.processData(navigation, detail.notification.data);
            }
            break;
        }
      }),
    );

    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;

      if (notification && (type === EventType.PRESS || type === EventType.ACTION_PRESS)) {
        if (notification.data) {
          app.notification.processData(navigation, notification.data);
        }

        if (notification.id) {
          await notifee.cancelNotification(notification.id);
        }
      }
    });

    unsubscribeList.push(
      messaging().onMessage(async (remoteMessage) => {
        if (remoteMessage.notification && remoteMessage.notification.body) {
          await app.notification.show(
            remoteMessage.notification.body.replace(/\n/g, '<br>'),
            remoteMessage.notification.title,
            remoteMessage.data,
          );
        }

        if (remoteMessage.data && (remoteMessage.data.goldChanged || remoteMessage.data.ticketChanged)) {
          reloadAuth().then(() => {});
        }
      }),
    );

    return () => {
      unsubscribeList.forEach((fn) => fn());
    };
  }, [navigation, reloadAuth]);

  useEffect(() => {
    loadAdid();
  }, [loadAdid]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleActiveFromBackground = useCallback(() => {
    if (isAndroid && adid === DEFAULT_ADID) {
      loadAdid();
    }
  }, [adid, loadAdid]);

  const handleHeader = useCallback((props: NativeStackHeaderProps) => <HeaderAppbar {...props} />, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <>
      <ActiveDetector onActiveFromBackground={handleActiveFromBackground} />
      <Fcm />

      <Stack.Navigator
        initialRouteName='MainTab'
        screenOptions={{
          ...commonStackNavigationOptions,
          gestureEnabled: !lockScreen,
          navigationBarColor: theme.colors.background,
        }}>
        <Stack.Screen name='MainTab' component={MainTab} options={{headerShown: false}} />
        {/*<StackNavigator.Group screenOptions={{header: handleHeader, presentation: isIos ? 'modal' : undefined}}>*/}
        {/*  <StackNavigator.Screen name='TermsOfService' component={TermsOfServiceScreen} />*/}
        {/*  <StackNavigator.Screen name='TermsOfPrivacy' component={TermsOfPrivacyScreen} />*/}
        {/*</StackNavigator.Group>*/}
        {auth && (
          <Stack.Group screenOptions={{header: handleHeader}}>
            <Stack.Screen name='MyResignForm' component={MyResignFormScreen} />
            <Stack.Screen name='MyNicknameChange' component={MyNicknameChangeScreen} />
          </Stack.Group>
        )}
        {!auth && (
          <Stack.Screen
            name='AuthStack'
            component={AuthStack}
            options={{headerShown: false, presentation: 'fullScreenModal'}}
          />
        )}
      </Stack.Navigator>

      <Dialog />
    </>
  );
};

export default MainStack;
