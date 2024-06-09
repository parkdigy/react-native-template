import React from 'react';
import {Text_Error, Text_W600} from '@style';
import {LabelProps as Props} from './Label.types';

const Label = ({children, required, error, ...props}: Props) => {
  return (
    <View {...props}>
      <Text_W600 color={error ? 'error' : 'accent'}>
        {children}
        {required && <Text_Error>&nbsp;*</Text_Error>}
      </Text_W600>
    </View>
  );
};

export default Label;
