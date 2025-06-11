import {Animated} from 'react-native';

export interface HeaderBlurViewProps {
  children?: ReactNode;
  animation?: {
    value: Animated.Value;
    interpolation: Animated.InterpolationConfigType;
  };
}
