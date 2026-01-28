import {type IconButtonProps as _IconButtonProps} from 'react-native-paper';
import {type IconProps as _IconProps} from '../../Icon';
import {type CustomComponentStyleProps} from '../../CustomComponent';

export interface IconButtonProps extends CustomComponentStyleProps, Omit<_IconButtonProps, 'icon'> {
  name: _IconProps['name'];
  color?: _IconProps['color'];
}
