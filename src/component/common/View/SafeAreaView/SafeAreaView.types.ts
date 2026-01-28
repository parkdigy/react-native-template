import {type ViewProps} from 'react-native';
import {type SafeAreaViewProps as NativeSafeAreaViewProps} from 'react-native-safe-area-context';
import {type CustomComponentStyleProps} from '../../CustomComponent';

export interface SafeAreaViewProps extends NativeSafeAreaViewProps, ViewProps, CustomComponentStyleProps {
  transparent?: boolean;
}
