import {type ScreenProps} from '@types';
import {TermsOfPrivacy} from '@comp';
import {ScreenBase} from '../@common';

export const TermsOfPrivacyScreen = ({navigation, route}: ScreenProps<'TermsOfPrivacy'>) => {
  return (
    <ScreenBase
      title='개인정보처리방침'
      header='blur'
      component={TermsOfPrivacy}
      bottomEdgeSafeArea
      navigation={navigation}
      route={route}
    />
  );
};

export default TermsOfPrivacyScreen;
