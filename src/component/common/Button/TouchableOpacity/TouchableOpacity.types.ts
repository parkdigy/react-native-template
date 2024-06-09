import {TouchableOpacityProps as NativeTouchableOpacityProps} from 'react-native';
import {CustomComponentStyleProps} from '../../CustomComponent';

export interface TouchableOpacityProps extends NativeTouchableOpacityProps, Omit<CustomComponentStyleProps, 'row'> {}
