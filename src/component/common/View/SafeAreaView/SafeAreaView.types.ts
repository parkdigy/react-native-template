import {ViewProps} from 'react-native';
import {SafeAreaViewProps as NativeSafeAreaViewProps} from 'react-native-safe-area-context';
import {CustomComponentStyleProps} from '../../CustomComponent';

export interface SafeAreaViewProps extends NativeSafeAreaViewProps, ViewProps, CustomComponentStyleProps {
  transparent?: boolean;
}
