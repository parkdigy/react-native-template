/********************************************************************************************************************
 * Root 스택 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootScreenList} from '@types';
import MainStack from '../MainStack';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<RootScreenList>();

const RootStack = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator initialRouteName='Main' screenOptions={commonStackNavigationOptions}>
      <Stack.Group>
        <Stack.Screen name='Main' component={MainStack} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
