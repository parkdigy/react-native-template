import React from 'react';
import {useActive} from '../../ActiveDetector';
import {BounceAnimationViewProps as Props} from './BounceAnimationView.types';

export const BounceAnimationView = ({stop, bounceHeight = 1.02, ...props}: Props) => {
  const active = useActive();

  return (
    <View
      animation={
        stop || !active
          ? 'none'
          : {
              from: {
                transform: [{scale: 1}],
              },
              to: {
                transform: [{scale: bounceHeight}],
              },
            }
      }
      easing='ease-out-cubic'
      iterationCount='infinite'
      direction='alternate'
      duration={500}
      {...props}
    />
  );
};

export default BounceAnimationView;
