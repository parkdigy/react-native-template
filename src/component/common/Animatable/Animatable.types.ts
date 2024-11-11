import {ImageProps, ImageStyle, TextProps, TextStyle, ViewProps, ViewStyle} from 'react-native';
import {AnimatableProps} from 'react-native-animatable';

export interface AnimatableViewProps extends Omit<AnimatableProps<ViewStyle>, 'useNativeDriver'>, ViewProps {
  notUseNativeDriver?: boolean;
}

export interface AnimatableTextProps extends Omit<AnimatableProps<TextStyle>, 'useNativeDriver'>, TextProps {}

export interface AnimatableImageProps extends Omit<AnimatableProps<ImageStyle>, 'useNativeDriver'>, ImageProps {
  notUseNativeDriver?: boolean;
}
