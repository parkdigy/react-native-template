import React from 'react';
import {ScreenProps} from '@types';
import {TermsOfService} from '@comp';
import {ScreenBase} from '../../@common';

const TermsOfServiceFullScreen = ({navigation, route}: ScreenProps<'TermsOfService'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '이용약관'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={TermsOfService} bottomEdgeSafeArea navigation={navigation} route={route} />;
};

export default TermsOfServiceFullScreen;
