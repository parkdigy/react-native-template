/********************************************************************************************************************
 * 로그인 스택 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {AuthScreenList} from '@types';
import {AuthHomeScreen, TermsOfPrivacyScreen, TermsOfServiceScreen} from '@screen';
import {HeaderAppbar} from '@ccomp';
import {useAppListener} from '@app';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<AuthScreenList>();

const AuthStack = () => {
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
    <>
      <Stack.Navigator
        initialRouteName='AuthHome'
        screenOptions={{...commonStackNavigationOptions, header: handleHeader, gestureEnabled: !lockScreen}}>
        <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
          <Stack.Screen name='AuthHome' component={AuthHomeScreen} />
        </Stack.Group>
        <Stack.Screen name='TermsOfService' component={TermsOfServiceScreen} />
        <Stack.Screen name='TermsOfPrivacy' component={TermsOfPrivacyScreen} />
      </Stack.Navigator>

      <Dialog />
    </>
  );
};

export default AuthStack;
