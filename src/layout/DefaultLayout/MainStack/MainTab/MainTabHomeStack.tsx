/********************************************************************************************************************
 * 홈 탭 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {MainTabHomeScreenList, ScreenProps} from '@types';
import {HomeScreen} from '@screen';
import {HeaderAppbar} from '@ccomp';
import {useAppListener} from '@app';

const Stack = createNativeStackNavigator<MainTabHomeScreenList>();

const MainTabHomeStack = ({}: ScreenProps) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const lockScreen = useAppListener('lockScreen');

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleHeader = useCallback((props: NativeStackHeaderProps) => <HeaderAppbar {...props} />, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{header: handleHeader, gestureEnabled: !lockScreen}}>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MainTabHomeStack;
