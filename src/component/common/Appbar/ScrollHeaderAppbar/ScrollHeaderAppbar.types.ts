import {StackNavigationProp} from '@react-navigation/stack';
import {Animated, LayoutChangeEvent} from 'react-native';
import {HeaderAppbarProps} from '../HeaderAppbar';

export interface ScrollHeaderAppbarProps extends Pick<HeaderAppbarProps, 'children' | 'subContent' | 'blur'> {
  navigation: StackNavigationProp<any>;
  animatedValue: Animated.AnimatedValue;
  onLayout?(e: LayoutChangeEvent): void;
}
