import React from 'react';
import {Modal as NativeModal, StatusBar} from 'react-native';
import {ModalProps as Props} from './Modal.types';

const Modal = ({animationType = 'slide', presentationStyle = 'formSheet', children, transparent, ...props}: Props) => {
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
      {isIos && (presentationStyle === 'pageSheet' || presentationStyle === 'formSheet' || 'overFullScreen') && (
        <StatusBar animated barStyle={'light-content'} />
      )}

      {finalPresentationStyle === 'overFullScreen' ? (
        <View backgroundColor={theme.colors.opacity50} flex={1}>
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
