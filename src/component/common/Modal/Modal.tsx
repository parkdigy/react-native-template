import React from 'react';
import {Modal as NativeModal, StatusBar} from 'react-native';
import {ModalProps as Props} from './Modal.types';

const Modal = ({
  animationType = 'slide',
  presentationStyle = 'formSheet',
  children,
  transparent,
  animation,
  delay,
  duration,
  easing,
  animationEndDelay,
  onAnimationBegin,
  onAnimationEnd,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalPresentationStyle = useMemo((): Props['presentationStyle'] => {
    switch (presentationStyle) {
      case 'pageSheet':
      case 'formSheet':
        return isAndroid ? 'fullScreen' : presentationStyle;
      default:
        return presentationStyle;
    }
  }, [presentationStyle]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <NativeModal
      animationType={animationType}
      presentationStyle={finalPresentationStyle}
      transparent={transparent}
      {...props}>
      {isIos && contains(['pageSheet', 'formSheet', 'overFullScreen'], finalPresentationStyle) && (
        <StatusBar animated barStyle={'light-content'} />
      )}

      {finalPresentationStyle === 'overFullScreen' ? (
        <View
          animation={animation}
          duration={duration}
          delay={delay}
          easing={easing}
          animationEndDelay={animationEndDelay}
          onAnimationBegin={onAnimationBegin}
          onAnimationEnd={onAnimationEnd}
          backgroundColor={theme.dark ? theme.colors.opacityReverse70 : theme.colors.opacity50}
          flex={1}>
          {children}
        </View>
      ) : (
        <SafeAreaView transparent={transparent}>{children}</SafeAreaView>
      )}

      <Dialog />
    </NativeModal>
  );
};

export default Modal;
