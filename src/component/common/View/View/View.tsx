import React from 'react';
import {View as NativeView} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {ViewProps as Props} from './View.types';

const View = React.forwardRef<NativeView, Props>(
  ({animation, delay, inline, width, fullWidth, style, animationEndDelay, onAnimationEnd, ...props}, ref) => {
    /********************************************************************************************************************
     * Ref
     * ******************************************************************************************************************/

    const [endDelayTimeoutRef, setEndDelayTimeout] = useTimeoutRef();

    /********************************************************************************************************************
     * Memo
     * ******************************************************************************************************************/

    const finalStyle: Props['style'] = useMemo(
      () => [style, inline ? {flexDirection: 'row', alignSelf: 'flex-start'} : undefined],
      [style, inline],
    );

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useEffect(() => {
      clearTimeoutRef(endDelayTimeoutRef);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animation]);

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
            ? () => setEndDelayTimeout(() => onAnimationEnd(), animationEndDelay)
            : onAnimationEnd
        }
        {...props}
      />
    );
  },
);

export default View;
