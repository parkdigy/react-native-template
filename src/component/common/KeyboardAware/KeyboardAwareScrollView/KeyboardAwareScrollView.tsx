import React from 'react';
import {
  EmitterSubscription,
  KeyboardEvent,
  TextInput,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
  useWindowDimensions,
  View as NativeView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollViewProps as Props} from './KeyboardAwareScrollView.types';

const KeyboardAwareScrollView = React.forwardRef<NativeScrollView, Props>(
  (
    {
      scrollEventThrottle,
      keyboardDismissMode,
      extraHeight,
      disableAutoScroll,
      onScroll,
      onContentSizeChange,
      onLayout,
      onKeyboardShow,
      onKeyboardHide,
      ...props
    },
    ref,
  ) => {
    const {height: windowHeight} = useWindowDimensions();
    const isActive = useIsFocused();

    /********************************************************************************************************************
     * Ref
     * ******************************************************************************************************************/

    const lastKeyboardHeightRef = useRef(0);
    const innerScrollViewRef = useRef<NativeScrollView>(null);
    const scrollViewTargetRef = useRef<NativeView>(null);
    const scrollViewBottomMarginRef = useRef(0);
    const scrollYRef = useRef(0);
    const contentHeightRef = useRef(0);

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [marginBottom, setMarginBottom] = useState(0);

    /********************************************************************************************************************
     * Function
     * ******************************************************************************************************************/

    const keyboardShow = useCallback(
      (keyboardHeight: number) => {
        const keyboardTop = windowHeight - keyboardHeight;
        const finalExtraHeight = extraHeight || 0;

        if (innerScrollViewRef.current && scrollViewTargetRef.current) {
          scrollViewTargetRef.current?.measureInWindow(
            (scrollViewX, scrollViewY, scrollViewWidth, scrollViewHeight) => {
              if (Platform.OS === 'ios') {
                const scrollViewBottom = scrollViewY + scrollViewHeight + scrollViewBottomMarginRef.current;

                if (lastKeyboardHeightRef.current !== keyboardHeight && scrollViewBottom > keyboardTop) {
                  lastKeyboardHeightRef.current = keyboardHeight;
                  scrollViewBottomMarginRef.current = scrollViewBottom - keyboardTop;
                  setMarginBottom(scrollViewBottomMarginRef.current);
                }
              }

              const currentlyFocusedField = TextInput.State.currentlyFocusedInput();
              if (currentlyFocusedField) {
                currentlyFocusedField.measureInWindow(
                  (focusedFieldX, focusedFieldY, focusedFieldWidth, focusedFieldHeight) => {
                    const focusedFieldBottom = focusedFieldY + focusedFieldHeight + finalExtraHeight;
                    if (focusedFieldBottom > keyboardTop) {
                      if (!disableAutoScroll) {
                        nextTick(() => {
                          innerScrollViewRef.current?.scrollTo({
                            x: 0,
                            y: scrollYRef.current + (focusedFieldBottom - keyboardTop),
                            animated: true,
                          });
                        });
                      }
                    }
                  },
                );
              }
            },
          );
        }
      },
      [disableAutoScroll, extraHeight, windowHeight],
    );

    const keyboardHide = useCallback(() => {
      setMarginBottom(0);
      scrollViewBottomMarginRef.current = 0;
      lastKeyboardHeightRef.current = 0;
    }, []);

    /********************************************************************************************************************
     * Event Handler - Keyboard
     * ******************************************************************************************************************/

    const handleKeyboardWillShow = useCallback(
      (event: KeyboardEvent) => {
        if (Platform.OS === 'ios') {
          onKeyboardShow?.(event.endCoordinates.height);
          nextTick(() => {
            keyboardShow(event.endCoordinates.height);
          });
        } else {
          keyboardShow(event.endCoordinates.height);
        }
      },
      [keyboardShow, onKeyboardShow],
    );

    const handleKeyboardWillHide = useCallback(() => {
      if (Platform.OS === 'ios') {
        onKeyboardHide?.();
        nextTick(() => {
          keyboardHide();
        });
      } else {
        keyboardHide();
      }
    }, [keyboardHide, onKeyboardHide]);

    const handleKeyboardDidShow = useCallback(
      (event: KeyboardEvent) => {
        if (Platform.OS === 'android') {
          onKeyboardShow?.(event.endCoordinates.height);
          nextTick(() => {
            keyboardShow(event.endCoordinates.height);
          });
        } else {
          keyboardShow(event.endCoordinates.height);
        }
      },
      [keyboardShow, onKeyboardShow],
    );

    const handleKeyboardDidHide = useCallback(() => {
      if (Platform.OS !== 'ios') {
        onKeyboardHide?.();
        nextTick(() => {
          keyboardHide();
        });
      } else {
        keyboardHide();
      }
    }, [keyboardHide, onKeyboardHide]);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useEffect(() => {
      let keyboardWillShowSubscription: EmitterSubscription;
      let keyboardDidShowSubscription: EmitterSubscription;
      let keyboardWillHideSubscription: EmitterSubscription;
      let keyboardDidHideSubscription: EmitterSubscription;

      if (isActive) {
        if (Platform.OS === 'ios') {
          keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
          keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);
        }
        keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
      }
      return () => {
        keyboardWillShowSubscription && keyboardWillShowSubscription.remove();
        keyboardDidShowSubscription && keyboardDidShowSubscription.remove();
        keyboardWillHideSubscription && keyboardWillHideSubscription.remove();
        keyboardDidHideSubscription && keyboardDidHideSubscription.remove();
      };
    }, [isActive, handleKeyboardDidHide, handleKeyboardDidShow, handleKeyboardWillHide, handleKeyboardWillShow]);

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollYRef.current = event.nativeEvent.contentOffset.y;
        onScroll?.(event);
      },
      [onScroll],
    );

    const handleContentSizeChange = useCallback(
      (width: number, height: number) => {
        contentHeightRef.current = height;
        onContentSizeChange?.(width, height);
      },
      [onContentSizeChange],
    );

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        scrollViewTargetRef.current = event.target as unknown as NativeView;
        onLayout?.(event);
      },
      [onLayout],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <ScrollView
        ref={(r) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(r);
            } else {
              ref.current = r;
            }
          }
          innerScrollViewRef.current = r;
        }}
        animated
        scrollEventThrottle={ifUndefined(scrollEventThrottle, 16)}
        keyboardDismissMode={ifUndefined(keyboardDismissMode, 'interactive')}
        style={{marginBottom}}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        {...props}
      />
    );
  },
);

export default KeyboardAwareScrollView;
