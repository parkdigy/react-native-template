import {type HeaderBlurViewProps as Props} from './HeaderBlurView.types';
import {BlurView} from '@react-native-community/blur';
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
    <View height={contentHeight} backgroundColor={'transparent'}>
      {isIos && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
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
