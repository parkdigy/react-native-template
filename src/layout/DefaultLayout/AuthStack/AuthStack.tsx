/********************************************************************************************************************
 * 로그인 스택 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {AuthScreenList} from '@types';
import {AuthHomeScreen, TermsOfPrivacyFullScreen, TermsOfServiceFullScreen} from '@screen';
import {HeaderAppbar} from '@ccomp';
import {useAppListener} from '@app';

const Stack = createNativeStackNavigator<AuthScreenList>();

const AuthStack = () => {
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
    <>
      <Stack.Navigator initialRouteName='AuthHome' screenOptions={{header: handleHeader, gestureEnabled: !lockScreen}}>
        <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
          <Stack.Screen name='AuthHome' component={AuthHomeScreen} />
        </Stack.Group>
        <Stack.Screen name='TermsOfService' component={TermsOfServiceFullScreen} />
        <Stack.Screen name='TermsOfPrivacy' component={TermsOfPrivacyFullScreen} />
      </Stack.Navigator>

      <Dialog />
    </>
  );
};

export default AuthStack;
