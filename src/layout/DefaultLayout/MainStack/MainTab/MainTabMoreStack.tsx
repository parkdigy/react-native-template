/********************************************************************************************************************
 * MY 탭 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTabMoreScreenList, ScreenProps} from '@types';
import {MoreHomeScreen} from '@screen';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<MainTabMoreScreenList>();

const MainTabMoreStack = ({}: ScreenProps) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator initialRouteName='MoreHome' screenOptions={commonStackNavigationOptions}>
      <Stack.Screen name='MoreHome' component={MoreHomeScreen} />
    </Stack.Navigator>
  );
};

export default MainTabMoreStack;
