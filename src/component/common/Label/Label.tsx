import React from 'react';
import {LabelProps as Props} from './Label.types';

const Label = ({children, required, error, ...props}: Props) => {
  return (
    <View {...props}>
      <Text_Default bold c={error ? 'error' : 'accent'}>
        {children}
        {required && <Text_Error>&nbsp;*</Text_Error>}
      </Text_Default>
    </View>
  );
};

export default Label;
