import React from 'react';
import {Text_13} from '@style';
import {TermsOfServiceProps as Props} from './TermsOfService.types';

export const TermsOfService = ({}: Props) => {
  return (
    <ContainerScrollView>
      {new Array(50).fill(0).map((_, i) => (
        <Text_13 key={i} lineHeight={18}>
          이용약관
        </Text_13>
      ))}
    </ContainerScrollView>
  );
};

export default TermsOfService;
