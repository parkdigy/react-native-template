import {type ScrollViewProps as NativeScrollViewProps} from 'react-native';
import {type CustomComponentStyleProps} from '../../../CustomComponent';
import {ScrollView as NativeScrollView} from 'react-native-gesture-handler';

export interface ScrollViewProps extends NativeScrollViewProps, Omit<CustomComponentStyleProps, 'row'> {
  ref?: Ref<NativeScrollView>;
  topBackgroundColor?: CustomComponentStyleProps['backgroundColor'];
  animated?: boolean;
  safeAreaInsetTop?: boolean;
}
