import React from 'react';
import {ScreenProps} from '@types';
import {AuthHome} from '@comp';
import {ScreenBase} from '../../@common';

export const AuthHomeScreen = ({navigation, route}: ScreenProps<'AuthHome'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: ''});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={AuthHome} bottomEdgeSafeArea navigation={navigation} route={route} />;
};

export default AuthHomeScreen;
