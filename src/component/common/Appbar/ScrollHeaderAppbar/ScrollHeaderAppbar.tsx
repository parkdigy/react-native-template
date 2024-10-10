import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';
import {HeaderAppbar, HeaderAppbarCommands} from '../HeaderAppbar';
import {ScrollHeaderAppbarProps as Props} from './ScrollHeaderAppbar.types';

const ScrollHeaderAppbar = ({children, navigation, animatedValue, onLayout, blur, subContent, ...props}: Props) => {
  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const headerAppbarRef = useRef<HeaderAppbarCommands>(null);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [headerHeight, setHeaderHeight] = useState(0);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const containerStyle = useMemo((): Animated.WithAnimatedValue<StyleProp<ViewStyle>> => {
    if (headerHeight > 0) {
      return {
        top: /*props.back
                ? 0
                : */ animatedValue.interpolate({
          inputRange: [0, headerHeight],
          outputRange: [0, -headerHeight],
          extrapolate: 'clamp',
        }),
      };
    }
  }, [headerHeight, animatedValue]);

  const style = useMemo((): Animated.WithAnimatedValue<StyleProp<ViewStyle>> => {
    if (headerHeight > 0) {
      return {
        opacity: /*props.back
                ? undefined
                :*/ animatedValue.interpolate({
          inputRange: [0, headerHeight * 0.75],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      };
    }
  }, [animatedValue, headerHeight]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleHeader = useCallback(
    (headerProps: StackHeaderProps) => (
      <HeaderAppbar
        ref={headerAppbarRef}
        key='ScrollHeaderAppbar'
        blur={blur}
        subContent={subContent}
        {...headerProps}
        {...props}
        containerStyle={containerStyle}
        style={style}
        onLayout={(e) => {
          setHeaderHeight(e.nativeEvent.layout.height);
          onLayout?.(e);
        }}>
        {children}
      </HeaderAppbar>
    ),
    [blur, children, containerStyle, onLayout, props, style, subContent],
  );

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    navigation.setOptions({
      header: handleHeader,
    });
  }, [children, navigation, animatedValue, headerHeight, blur, subContent, handleHeader]);

  return null;
};

ScrollHeaderAppbar.Action = HeaderAppbar.Action;
ScrollHeaderAppbar.BackAction = HeaderAppbar.BackAction;
ScrollHeaderAppbar.Content = HeaderAppbar.Content;

export default ScrollHeaderAppbar;
