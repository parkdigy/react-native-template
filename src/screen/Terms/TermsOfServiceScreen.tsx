import React from 'react';
import {ScreenProps} from '@types';
import {TermsOfService} from '@comp';
import {ScreenBase} from '../@common';

export const TermsOfServiceScreen = ({navigation, route}: ScreenProps<'TermsOfService'>) => {
  return (
    <ScreenBase
      title='이용약관'
      header='blur'
      component={TermsOfService}
      bottomEdgeSafeArea
      navigation={navigation}
      route={route}
    />
  );
};

export default TermsOfServiceScreen;
