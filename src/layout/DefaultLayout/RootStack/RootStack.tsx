/********************************************************************************************************************
 * Root 스택 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootScreenList} from '@types';
import {useAppListener} from '@app';
import MainStack from '../MainStack';

const Stack = createNativeStackNavigator<RootScreenList>();

const RootStack = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const lockScreen = useAppListener('lockScreen');

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
