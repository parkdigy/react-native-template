import React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {MainTab3ScreenList, ScreenProps} from '@types';
import {Tab3HomeScreen} from '@screen';
import {HeaderAppbar} from '@ccomp';
import {useAppListener} from '@app';

const Stack = createNativeStackNavigator<MainTab3ScreenList>();

const MainTab3Stack = ({}: ScreenProps) => {
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
    <Stack.Navigator initialRouteName='Tab3Home' screenOptions={{header: handleHeader, gestureEnabled: !lockScreen}}>
      <Stack.Screen name='Tab3Home' component={Tab3HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MainTab3Stack;
