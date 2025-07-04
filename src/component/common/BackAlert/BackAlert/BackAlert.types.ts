import {GestureResponderEvent, ViewStyle} from 'react-native';
import {ButtonProps} from '../../Button';
import {StackProps} from '../../Stack';

export interface BackAlertProps extends Pick<StackProps, 'pv' | 'onLayout'> {
  icon?: 'info' | 'error' | 'no_data';
  iconColor?: string;
  text?: string;
  textColor?: TextProps['color'];
  textFontSize?: TextProps['fontSize'];
  textBold?: boolean;
  retryButtonText?: string;
  retryButtonProps?: Omit<ButtonProps, 'children' | 'onPress'>;
  closeButtonText?: string;
  closeButtonProps?: Omit<ButtonProps, 'children' | 'onPress'>;
  noFullHeight?: boolean;
  style?: ViewStyle;
  onRetryPress?: (e: GestureResponderEvent) => void;
  onClosePress?: (e: GestureResponderEvent) => void;
}
