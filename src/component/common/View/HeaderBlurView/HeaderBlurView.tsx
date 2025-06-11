import React from 'react';
import {HeaderBlurViewProps as Props} from './HeaderBlurView.types';
import {BlurView} from '@react-native-community/blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Animated} from 'react-native';

export const HeaderBlurView = ({children, animation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [contentHeight, setContentHeight] = useState(0);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return safeAreaInsets.top > 0 || children ? (
    <View height={contentHeight}>
      {isIos && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            opacity: animation ? animation.value.interpolate(animation.interpolation) : 1,
          }}>
          <BlurView
            style={{
              height: safeAreaInsets.top + contentHeight,
            }}
            blurType={theme.dark ? 'dark' : 'light'}
            reducedTransparencyFallbackColor={theme.colors.background}
          />
        </Animated.View>
      )}
      <View
        position='absolute'
        width='100%'
        top={safeAreaInsets.top}
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}>
        {children}
      </View>
    </View>
  ) : null;
};

export default HeaderBlurView;
