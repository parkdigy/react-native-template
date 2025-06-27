import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTab3ScreenList, ScreenProps} from '@types';
import {Tab3HomeScreen} from '@screen';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<MainTab3ScreenList>();

const MainTab3Stack = ({}: ScreenProps) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator initialRouteName='Tab3Home' screenOptions={commonStackNavigationOptions}>
      <Stack.Screen name='Tab3Home' component={Tab3HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainTab3Stack;
