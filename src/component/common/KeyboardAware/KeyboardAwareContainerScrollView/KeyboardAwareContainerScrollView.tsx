import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareContainerScrollViewProps as Props} from './KeyboardAwareContainerScrollView.types';

const KeyboardAwareContainerScrollView = React.forwardRef<NativeScrollView, Props>(
  ({children, extraHeight, ...props}, ref) => {
    return (
      <KeyboardAwareScrollView ref={ref} extraHeight={ifUndefined(extraHeight, 70)} {...props}>
        <View style={{paddingHorizontal: 24, paddingVertical: 16}}>{children}</View>
      </KeyboardAwareScrollView>
    );
  },
);

export default KeyboardAwareContainerScrollView;
