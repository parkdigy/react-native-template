import React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {MainTab1ScreenList, ScreenProps} from '@types';
import {Tab1HomeScreen} from '@screen';
import {HeaderAppbar} from '@ccomp';
import {useAppListener} from '@app';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<MainTab1ScreenList>();

const MainTab1Stack = ({}: ScreenProps) => {
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
      initialRouteName='Tab1Home'
      screenOptions={{...commonStackNavigationOptions, header: handleHeader, gestureEnabled: !lockScreen}}>
      <Stack.Screen name='Tab1Home' component={Tab1HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MainTab1Stack;
