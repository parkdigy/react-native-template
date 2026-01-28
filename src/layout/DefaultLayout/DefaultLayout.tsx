/********************************************************************************************************************
 * 기본 레이아웃 컴포넌트
 * ******************************************************************************************************************/

import {useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppState} from '@context';
import app, {useAppListener} from '@app';
import RootStack from './RootStack';

const Stack = createNativeStackNavigator<{Root: undefined}>();

const DefaultLayout = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const appStatus = useAppListener('appStatus');
  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    switch (appStatus) {
      case app.AppStatus.Main:
        nextTick(() => {
          app.navigationBar.fullScreen(false);
          app.navigationBar.set('transparent', theme.dark ? 'light' : 'dark');
        });
        break;
    }
  }, [appStatus, theme]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <>
      {appStatus === app.AppStatus.Main && (
        <StatusBar
          animated
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
      )}

      <Stack.Navigator screenOptions={commonStackNavigationOptions}>
        <Stack.Screen name='Root' component={RootStack} />
      </Stack.Navigator>
    </>
  );
};

export default DefaultLayout;
