import {ReactElement, RefObject} from 'react';
import {StatusBarStyle} from 'react-native';
import {KeyboardAwareScrollViewProps} from '../../KeyboardAware';

export interface FullScreenDialogButton {
  label: string;
  color?: ButtonProps['color'];
  disabled?: boolean;
  loading?: boolean;
  onPress?: ButtonProps['onPress'];
}

export interface FullScreenDialogProps
  extends Omit<ModalProps, 'presentationStyle' | 'transparent' | 'onRequestClose'> {
  keyboardAware?: boolean;
  keyboardAwareScrollViewRef?: RefObject<NativeScrollView>;
  keyboardAwareScrollViewProps?: Pick<KeyboardAwareScrollViewProps, 'extraHeight'>;
  title?: string | ReactElement;
  titleColor?: string;
  titleBackgroundColor?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullMax?: boolean;
  maxWidth?: number;
  minWidth?: number;
  backdropClose?: boolean;
  hideCloseButton?: boolean;
  disabledCloseButton?: boolean;
  statusBarStyle?: StatusBarStyle;
  bottomView?: ReactElement;
  buttons?: FullScreenDialogButton | FullScreenDialogButton[];
  onRequestClose?(): void;
}
