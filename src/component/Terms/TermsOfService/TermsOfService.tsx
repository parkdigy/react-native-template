import React from 'react';
import {Text_Default} from '@style';
import {TermsOfServiceProps as Props} from './TermsOfService.types';

export const TermsOfService = ({}: Props) => {
  return (
    <ContainerScrollView>
      {new Array(50).fill(0).map((_, i) => (
        <Text_Default s={13} key={i} lineHeight={18}>
          이용약관
        </Text_Default>
      ))}
    </ContainerScrollView>
  );
};

export default TermsOfService;
