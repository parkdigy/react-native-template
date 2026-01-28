import {type StackNavigationProp} from '@react-navigation/stack';
import {Animated, type LayoutChangeEvent} from 'react-native';
import {type HeaderAppbarProps} from '../HeaderAppbar';

export interface ScrollHeaderAppbarProps extends Pick<HeaderAppbarProps, 'children' | 'subContent' | 'blur'> {
  navigation: StackNavigationProp<any>;
  animatedValue: Animated.AnimatedValue;
  onLayout?(e: LayoutChangeEvent): void;
}
