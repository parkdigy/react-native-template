/********************************************************************************************************************
 * 로그인 스택 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreenList} from '@types';
import {AuthHomeScreen, TermsOfPrivacyScreen, TermsOfServiceScreen} from '@screen';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<AuthScreenList>();

const AuthStack = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <>
      <Stack.Navigator initialRouteName='AuthHome' screenOptions={commonStackNavigationOptions}>
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
