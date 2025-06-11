import React from 'react';
import {TermsOfServiceProps as Props} from './TermsOfService.types';

export const TermsOfService = ({}: Props) => {
  return (
    <ContainerScrollView>
      {new Array(50).fill(0).map((_, i) => (
        <T s={13} key={i} lineHeight={18}>
          이용약관
        </T>
      ))}
    </ContainerScrollView>
  );
};

export default TermsOfService;
