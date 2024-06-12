/********************************************************************************************************************
 * 기본 레이아웃 컴포넌트
 * ******************************************************************************************************************/

import React, {useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppListener} from '@app';
import RootStack from './RootStack';

const Stack = createNativeStackNavigator<{Root: undefined}>();

const DefaultLayout = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const appStatus = useAppListener('appStatus');
  const lockScreen = useAppListener('lockScreen');

  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    switch (appStatus) {
      case app.AppStatus.AppSplashHiding:
        nextTick(() => {
          app.navigationBar.fullScreen(false);
          app.navigationBar.set(theme.colors.background, theme.dark ? 'light' : 'dark');
        });
        break;
      case app.AppStatus.Main:
        nextTick(() => {
          app.navigationBar.fullScreen(false);
          app.navigationBar.set(theme.dark ? theme.colors.black : theme.colors.white, theme.dark ? 'light' : 'dark');
        });
        break;
    }
  }, [appStatus, theme]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <>
      {!contains(
        [
          app.AppStatus.Loading,
          app.AppStatus.LoadError,
          app.AppStatus.RequiredAppUpdate,
          app.AppStatus.CodePushDownloading,
          app.AppStatus.CodePushInstalling,
          app.AppStatus.CodePushChecked,
          app.AppStatus.AppSplashHiding,
        ],
        appStatus,
      ) && (
        <StatusBar
          animated
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
      )}

      <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: !lockScreen}}>
        <Stack.Screen name='Root' component={RootStack} />
      </Stack.Navigator>
    </>
  );
};

export default DefaultLayout;
