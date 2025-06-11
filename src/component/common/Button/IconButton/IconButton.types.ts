import {IconButtonProps as _IconButtonProps} from 'react-native-paper';
import {IconProps as _IconProps} from '../../Icon';
import {CustomComponentStyleProps} from '../../CustomComponent';

export interface IconButtonProps extends CustomComponentStyleProps, Omit<_IconButtonProps, 'icon'> {
  name: _IconProps['name'];
  color?: _IconProps['color'];
}
