/********************************************************************************************************************
 * Root 스택 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootScreenList} from '@types';
import {useAppState} from '@context';
import {useAppListener} from '@app';
import MainStack from '../MainStack';
import {AppStatus} from '../../../common/app/app.types';

const Stack = createNativeStackNavigator<RootScreenList>();

const RootStack = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {auth} = useAppState();
  const appStatus = useAppListener('appStatus');
  const lockScreen = useAppListener('lockScreen');

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (contains(['auth', 'main'], appStatus)) {
      if (auth) {
        app.setAppStatus(AppStatus.Main);
      } else {
        app.setAppStatus(AppStatus.Auth);
      }
    }
  }, [appStatus, auth]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator
      initialRouteName='Main'
      screenOptions={{
        headerShown: false,
        gestureEnabled: lockScreen,
      }}>
      <Stack.Group>
        <Stack.Screen name='Main' component={MainStack} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
