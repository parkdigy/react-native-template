/********************************************************************************************************************
 * MY 탭 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {MainTabMoreScreenList, ScreenProps} from '@types';
import {MoreHomeScreen} from '@screen';
import {HeaderAppbar} from '@ccomp';
import {useAppListener} from '@app';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<MainTabMoreScreenList>();

const MainTabMoreStack = ({}: ScreenProps) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const lockScreen = useAppListener('lockScreen');
  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleHeader = useCallback((props: NativeStackHeaderProps) => <HeaderAppbar {...props} />, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator
      initialRouteName='MoreHome'
      screenOptions={{...commonStackNavigationOptions, header: handleHeader, gestureEnabled: !lockScreen}}>
      <Stack.Screen name='MoreHome' component={MoreHomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MainTabMoreStack;
