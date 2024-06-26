import React from 'react';
import {Text_Default} from '@style';
import {TermsOfPrivacyProps as Props} from './TermsOfPrivacy.types';

export const TermsOfPrivacy = ({}: Props) => {
  return (
    <ContainerScrollView>
      {new Array(50).fill(0).map((_, i) => (
        <Text_Default s={13} key={i} lineHeight={18}>
          개인정보처리방침
        </Text_Default>
      ))}
    </ContainerScrollView>
  );
};

export default TermsOfPrivacy;
