import {ScrollViewProps as NativeScrollViewProps} from 'react-native';
import {CustomComponentStyleProps} from '../../../CustomComponent';

export interface ScrollViewProps extends NativeScrollViewProps, Omit<CustomComponentStyleProps, 'row'> {
  topBackgroundColor?: CustomComponentStyleProps['backgroundColor'];
  animated?: boolean;
  safeAreaInsetTop?: boolean;
}
