import React from 'react';
import {View as NativeView} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {ViewProps as Props} from './View.types';

const View = React.forwardRef<NativeView, Props>(
  ({animation, delay, inline, width, fullWidth, style, animationEndDelay, onAnimationEnd, ...props}, ref) => {
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

    return (
      <CustomComponent
        ref={ref}
        component={animation ? Animatable.View : NativeView}
        animation={animation !== 'none' && animation ? animation : undefined}
        delay={animation !== 'none' && animation ? delay : undefined}
        width={ifUndefined(width, fullWidth ? '100%' : undefined)}
        style={finalStyle}
        onAnimationEnd={
          onAnimationEnd && animationEndDelay
            ? () => setTimeout(() => onAnimationEnd(), animationEndDelay)
            : onAnimationEnd
        }
        {...props}
      />
    );
  },
);

export default View;
