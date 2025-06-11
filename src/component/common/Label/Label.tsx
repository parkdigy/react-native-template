import React from 'react';
import {LabelProps as Props} from './Label.types';

const Label = ({children, required, error, ...props}: Props) => {
  return (
    <View {...props}>
      <T bold c={error ? 'error' : 'accent'}>
        {children}
        {required && <TError>&nbsp;*</TError>}
      </T>
    </View>
  );
};

export default Label;
