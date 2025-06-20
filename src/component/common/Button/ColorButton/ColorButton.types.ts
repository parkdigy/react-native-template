import {GestureResponderEvent} from 'react-native';
import {IconProps} from '../../Icon';

export interface ColorButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'purple_violet' | 'violet_pink' | 'pink_dark_green' | 'blue_violet' | 'blue_marine' | 'deep_blue' | 'grey';
  icon?: IconProps['name'];
  labelAlign?: 'left' | 'center' | 'right';
  children: ReactNode;
  onPress?(event: GestureResponderEvent): void;
}
