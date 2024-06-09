import React from 'react';
import {View as NativeView} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {ViewProps as Props} from './View.types';

const View = React.forwardRef<NativeView, Props>(({animated, inline, style, ...props}, ref) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalStyle: Props['style'] = useMemo(
    () => [style, inline ? {flexDirection: 'row', alignSelf: 'flex-start'} : undefined],
    [style, inline],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <CustomComponent ref={ref} component={animated ? Animated.View : NativeView} style={finalStyle} {...props} />;
});

export default View;
