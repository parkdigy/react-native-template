import {ViewProps as NativeViewProps} from 'react-native';
import {CustomComponentStyleProps} from '../../CustomComponent';

export interface ViewProps extends NativeViewProps, CustomComponentStyleProps {
  inline?: boolean;
  animated?: boolean;
}
