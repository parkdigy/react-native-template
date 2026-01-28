import {View as NativeView} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {type ViewProps as Props} from './View.types';

const View = ({
  animation: initAnimation,
  duration: initDuration,
  delay: initDelay,
  easing: initEasing,
  inline,
  width,
  fullWidth,
  style,
  center,
  animationEndDelay,
  onAnimationBegin,
  onAnimationEnd,
  secondAnimation,
  secondAnimationDuration,
  secondAnimationDelay,
  secondAnimationEasing,
  onSecondAnimationBegin,
  onSecondAnimationEnd,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const [endDelayTimeoutRef, setEndDelayTimeout] = useTimeoutRef();
  const [sendAnimationTimeoutRef, setSendAnimationTimeout] = useTimeoutRef();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [animation, setAnimation] = useState(initAnimation);
  const [easing, setEasing] = useState(() => initEasing);
  const [isSecondAnimation, setIsSecondAnimation] = useState(false);

  const [delay, setDelay] = useState(initDelay);
  useFirstSkipChanged(() => setDelay(initDelay), [initDelay]);

  const [duration, setDuration] = useState(initDuration);
  useFirstSkipChanged(() => setDuration(initDuration), [initDuration]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalStyle: Props['style'] = useMemo(
    () => [
      style,
      inline
        ? {flexDirection: 'row', alignSelf: 'flex-start'}
        : center
        ? {alignItems: 'center', justifyContent: 'center'}
        : undefined,
    ],
    [style, inline, center],
  );

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEventEffect(() => {
    clearTimeoutRef(endDelayTimeoutRef);
    clearTimeoutRef(sendAnimationTimeoutRef);
    setIsSecondAnimation(false);
    setAnimation(initAnimation);
  }, [initAnimation]);

  useEffect(() => {
    setEasing(initEasing);
  }, [initEasing]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleAnimationBegin = useCallback(() => {
    if (isSecondAnimation) {
      onSecondAnimationBegin?.();
    } else {
      onAnimationBegin?.();
    }
  }, [isSecondAnimation, onAnimationBegin, onSecondAnimationBegin]);

  const handleAnimationEnd = useCallback(() => {
    if (isSecondAnimation) {
      onSecondAnimationEnd?.();
    } else {
      if (onAnimationEnd) {
        if (animationEndDelay) {
          setEndDelayTimeout(() => onAnimationEnd(), animationEndDelay);
        } else {
          onAnimationEnd();
        }
      }

      if (secondAnimation) {
        setIsSecondAnimation(true);
        setSendAnimationTimeout(() => {
          setAnimation(secondAnimation);
          setDuration(secondAnimationDuration);
          setDelay(secondAnimationDelay);
          setEasing(secondAnimationEasing);
        }, secondAnimationDelay);
      }
    }
  }, [
    animationEndDelay,
    isSecondAnimation,
    onAnimationEnd,
    onSecondAnimationEnd,
    secondAnimation,
    secondAnimationDelay,
    secondAnimationDuration,
    secondAnimationEasing,
    setDelay,
    setDuration,
    setEndDelayTimeout,
    setSendAnimationTimeout,
  ]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <CustomComponent
      component={animation ? Animatable.View : NativeView}
      animation={animation !== 'none' && animation ? animation : undefined}
      duration={duration}
      delay={animation !== 'none' && animation ? delay : undefined}
      easing={easing}
      width={ifUndefined(width, fullWidth ? '100%' : undefined)}
      style={finalStyle}
      onAnimationBegin={handleAnimationBegin}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    />
  );
};
export default View;
