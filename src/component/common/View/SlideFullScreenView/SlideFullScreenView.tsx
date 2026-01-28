import {hasNotch} from 'react-native-device-info';
import {type SlideFullScreenViewCommand, type SlideFullScreenViewProps as Props} from './SlideFullScreenView.types';
import {CloseIconButton} from '../../Button/CloseIconButton';
import {useChanged} from '@pdg/react-hook';

export const SlideFullScreenView = ({
  ref,
  animationType = 'slide',
  noAnimation,
  show,
  backgroundColor,
  safeArea,
  overflow,
  showClose,
  closeColor,
  preventBackClose,
  children,
  onShown,
  onHidden,
  onRequestClose,
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {top: safeAreaTop} = useSafeAreaInsets();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const oldIsLockScreen = useRef<boolean>(false);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [mounted, setMounted] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [isCloseAnimatingEnd, setIsCloseAnimatingEnd] = useState(true);

  /********************************************************************************************************************
   * Changed
   * ******************************************************************************************************************/

  useChanged(() => {
    setIsCloseAnimatingEnd(false);
  }, [showClose]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    return () => {
      setMounted(false);

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

  useEventEffect(() => {
    if (noAnimation) {
      if (hiding) {
        onHidden?.();
      } else {
        onShown?.();
      }
    }
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

  useForwardRef(
    ref,
    useMemo<SlideFullScreenViewCommand>(() => ({hide}), [hide]),
  );

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
        duration={!showClose && !mounted ? 1 : 300}
        position='absolute'
        top={(safeArea ? 0 : safeAreaTop) + (hasNotch() ? 0 : px.s10)}
        right={px.s5}
        style={!showClose && isCloseAnimatingEnd ? {transform: [{translateX: 100}]} : undefined}
        onAnimationEnd={() => setIsCloseAnimatingEnd(true)}>
        <CloseIconButton iconColor={closeColor} onPress={onRequestClose || hide} />
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
};

export default SlideFullScreenView;
