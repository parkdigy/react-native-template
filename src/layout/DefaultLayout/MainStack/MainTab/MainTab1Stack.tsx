import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTab1ScreenList, ScreenProps} from '@types';
import {Tab1HomeScreen} from '@screen';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<MainTab1ScreenList>();

const MainTab1Stack = ({}: ScreenProps) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator initialRouteName='Tab1Home' screenOptions={commonStackNavigationOptions}>
      <Stack.Screen name='Tab1Home' component={Tab1HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainTab1Stack;
