import {ModalProps as NativeModalProps} from 'react-native';

export interface ModalProps
  extends NativeModalProps,
    Pick<
      ViewProps,
      'animation' | 'delay' | 'duration' | 'easing' | 'onAnimationBegin' | 'onAnimationEnd' | 'animationEndDelay'
    > {}
