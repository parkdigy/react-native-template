import React from 'react';
import {View, Text, Image} from 'react-native-animatable';
import {AnimatableImageProps, AnimatableTextProps, AnimatableViewProps} from './Animatable.types';

const AnimatableView = ({notUseNativeDriver, ...props}: AnimatableViewProps) => {
  return <View useNativeDriver={!notUseNativeDriver} {...props} />;
};

const AnimatableText = ({...props}: AnimatableTextProps) => {
  return <Text {...props} />;
};

const AnimatableImage = ({notUseNativeDriver, ...props}: AnimatableImageProps) => {
  return <Image useNativeDriver={!notUseNativeDriver} {...props} />;
};

export const Animatable = {
  View: AnimatableView,
  Text: AnimatableText,
  Image: AnimatableImage,
};

export default Animatable;
