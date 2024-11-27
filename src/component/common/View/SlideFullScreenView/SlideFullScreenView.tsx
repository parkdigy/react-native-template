import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hasNotch} from 'react-native-device-info';
import {CloseIconButton} from '../../Button/CloseIconButton';
import {SlideFullScreenViewCommand, SlideFullScreenViewProps as Props} from './SlideFullScreenView.types';

export const SlideFullScreenView = React.forwardRef<SlideFullScreenViewCommand, Props>(
  (
    {
      animationType = 'slide',
      noAnimation,
      show,
      backgroundColor,
      safeArea,
      overflow,
      showClose,
      preventBackClose,
      children,
      onShown,
      onHidden,
      onRequestClose,
    },
    ref,
  ) => {
    /********************************************************************************************************************
     * Use
     * ******************************************************************************************************************/

    const theme = useTheme();
    const {top: safeAreaTop} = useSafeAreaInsets();

    /********************************************************************************************************************
     * Ref
     * ******************************************************************************************************************/

    const mountedRef = useMountedRef();
    const oldIsLockScreen = useRef<boolean>();

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [hiding, setHiding] = useState(false);
    const [isCloseAnimatingEnd, setIsCloseAnimatingEnd] = useState(true);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useEffect(() => {
      return () => {
        if (oldIsLockScreen.current !== undefined) {
          app.setLockScreen(oldIsLockScreen.current);
        }
      };
    }, []);

    useEffect(() => {
      if (preventBackClose) {
        if (oldIsLockScreen.current === undefined) {
          oldIsLockScreen.current = app.getLockScreen();
        }

        app.setLockScreen(true);
      }
    }, [preventBackClose]);

    useEffect(() => {
      setIsCloseAnimatingEnd(false);
    }, [showClose]);

    useEffect(() => {
      if (noAnimation) {
        if (hiding) {
          onHidden?.();
        } else {
          onShown?.();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hiding]);

    /********************************************************************************************************************
     * Function
     * ******************************************************************************************************************/

    const hide = useCallback(() => {
      setHiding(true);
    }, []);

    /********************************************************************************************************************
     * Commands
     * ******************************************************************************************************************/

    useEffect(() => {
      if (ref) {
        const command: SlideFullScreenViewCommand = {
          hide,
        };

        if (typeof ref === 'function') {
          ref(command);
        } else {
          ref.current = command;
        }

        return () => {
          if (typeof ref === 'function') {
            ref(null);
          } else {
            ref.current = null;
          }
        };
      }
    }, [ref, hide]);

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    let animation: ViewProps['animation'] = hiding ? 'fadeOutDownBig' : 'fadeInUpBig';
    if (animationType === 'zoom') {
      animation = hiding ? 'zoomOut' : 'zoomIn';
    } else if (animationType === 'fade') {
      animation = hiding ? 'fadeOut' : 'fadeIn';
    }

    const content = (
      <View flex={1} overflow={overflow}>
        {children}

        <View
          animation={showClose ? 'fadeIn' : 'fadeOut'}
          duration={!showClose && !mountedRef.current ? 1 : 300}
          position='absolute'
          top={(safeArea ? 0 : safeAreaTop) + (hasNotch() ? 0 : px.s10)}
          right={px.s5}
          style={!showClose && isCloseAnimatingEnd ? {transform: [{translateX: 100}]} : undefined}
          onAnimationEnd={() => setIsCloseAnimatingEnd(true)}>
          <CloseIconButton onPress={onRequestClose || hide} />
        </View>
      </View>
    );

    return show ? (
      <>
        <View
          flex={1}
          animation={noAnimation ? 'none' : animation}
          duration={250}
          backgroundColor={ifUndefined(backgroundColor, theme.colors.background)}
          onAnimationEnd={hiding ? onHidden : onShown}>
          {safeArea ? <SafeAreaView backgroundColor='transparent'>{content}</SafeAreaView> : content}
        </View>

        <Dialog />
      </>
    ) : null;
  },
);

export default SlideFullScreenView;