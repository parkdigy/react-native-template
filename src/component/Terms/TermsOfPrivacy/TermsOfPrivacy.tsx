import React from 'react';
import {Text_13} from '@style';
import {TermsOfPrivacyProps as Props} from './TermsOfPrivacy.types';

export const TermsOfPrivacy = ({}: Props) => {
  return (
    <ContainerScrollView>
      {new Array(50).fill(0).map((_, i) => (
        <Text_13 key={i} lineHeight={18}>
          개인정보처리방침
        </Text_13>
      ))}
    </ContainerScrollView>
  );
};

export default TermsOfPrivacy;
