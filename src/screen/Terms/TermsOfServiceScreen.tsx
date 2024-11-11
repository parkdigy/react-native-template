import React from 'react';
import {ScreenProps} from '@types';
import {TermsOfService} from '@comp';
import {ScreenBase} from '../@common';

export const TermsOfServiceScreen = ({navigation, route}: ScreenProps<'TermsOfService'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '이용약관'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={TermsOfService} navigation={navigation} route={route} />;
};

export default TermsOfServiceScreen;
