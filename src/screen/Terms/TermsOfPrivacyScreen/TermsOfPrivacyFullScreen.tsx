import React from 'react';
import {ScreenProps} from '@types';
import {TermsOfPrivacy} from '@comp';
import {ScreenBase} from '../../@common';

const TermsOfPrivacyFullScreen = ({navigation, route}: ScreenProps<'TermsOfPrivacy'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '개인정보처리방침'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={TermsOfPrivacy} bottomEdgeSafeArea navigation={navigation} route={route} />;
};

export default TermsOfPrivacyFullScreen;
