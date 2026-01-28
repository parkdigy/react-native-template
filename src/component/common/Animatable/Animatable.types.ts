import {
  type ImageProps,
  type ImageStyle,
  type TextProps,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import {type AnimatableProps} from 'react-native-animatable';

export interface AnimatableViewProps extends Omit<AnimatableProps<ViewStyle>, 'useNativeDriver'>, ViewProps {
  notUseNativeDriver?: boolean;
}

export interface AnimatableTextProps extends Omit<AnimatableProps<TextStyle>, 'useNativeDriver'>, TextProps {}

export interface AnimatableImageProps extends Omit<AnimatableProps<ImageStyle>, 'useNativeDriver'>, ImageProps {
  notUseNativeDriver?: boolean;
}
