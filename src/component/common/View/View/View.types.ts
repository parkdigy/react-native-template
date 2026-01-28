import {type ViewProps as NativeViewProps, type ViewStyle} from 'react-native';
import {type AnimatableProps} from 'react-native-animatable';
import {type CustomComponentStyleProps} from '../../CustomComponent';

export interface ViewProps
  extends NativeViewProps,
    CustomComponentStyleProps,
    Omit<AnimatableProps<ViewStyle>, 'animation' | 'useNativeDriver'> {
  ref?: Ref<NativeView>;
  inline?: boolean;
  center?: boolean;
  fullWidth?: boolean;
  animation?: AnimatableProps<ViewStyle>['animation'] | 'none';
  notUseNativeDriver?: boolean;
  animationEndDelay?: number;
  secondAnimation?: AnimatableProps<ViewStyle>['animation'] | 'none';
  secondAnimationDuration?: number;
  secondAnimationDelay?: number;
  secondAnimationEasing?: AnimatableProps<ViewStyle>['easing'];
  onSecondAnimationBegin?: () => void;
  onSecondAnimationEnd?: () => void;
}
