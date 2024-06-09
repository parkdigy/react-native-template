import React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {MainTab2ScreenList, ScreenProps} from '@types';
import {Tab2HomeScreen} from '@screen';
import {HeaderAppbar} from '@ccomp';
import {useAppListener} from '@app';

const Stack = createNativeStackNavigator<MainTab2ScreenList>();

const MainTab2Stack = ({}: ScreenProps) => {
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
    <Stack.Navigator initialRouteName='Tab2Home' screenOptions={{header: handleHeader, gestureEnabled: !lockScreen}}>
      <Stack.Screen name='Tab2Home' component={Tab2HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MainTab2Stack;
