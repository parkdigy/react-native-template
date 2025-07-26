import {TouchableOpacityProps} from '../TouchableOpacity';

export interface CloseIconButtonProps extends Pick<TouchableOpacityProps, 'mt' | 'mb' | 'ml' | 'mr' | 'mv' | 'mh'> {
  size?: number;
  iconColor?: string;
  opacity?: number;
  backgroundColor?: string;
  onPress?(): void;
}
