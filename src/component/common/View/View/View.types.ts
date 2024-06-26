import {ViewProps as NativeViewProps, ViewStyle} from 'react-native';
import {AnimatableProps} from 'react-native-animatable';
import {CustomComponentStyleProps} from '../../CustomComponent';

export interface ViewProps
  extends NativeViewProps,
    CustomComponentStyleProps,
    Omit<AnimatableProps<ViewStyle>, 'animation' | 'useNativeDriver'> {
  inline?: boolean;
  fullWidth?: boolean;
  animation?: AnimatableProps<ViewStyle>['animation'] | 'none';
  notUseNativeDriver?: boolean;
  animationEndDelay?: number;
}
