import {type TouchableOpacityProps as NativeTouchableOpacityProps} from 'react-native';
import {type CustomComponentStyleProps} from '../../CustomComponent';

export interface TouchableOpacityProps extends NativeTouchableOpacityProps, Omit<CustomComponentStyleProps, 'row'> {}
