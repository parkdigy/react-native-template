import {CustomAnimation} from 'react-native-animatable';

export const animations = {
  /** fade zoom */
  fadeInZoomIn: makeAnimation({
    0: {
      opacity: 0,
      transform: [{scale: 0}],
    },
    0.5: {
      opacity: 0.2,
    },
    1: {
      opacity: 1,
      transform: [{scale: 1}],
    },
  }),
  fadeOutZoomOut: makeAnimation({
    0: {
      opacity: 1,
      transform: [{scale: 1}],
    },
    0.5: {
      opacity: 0.2,
    },
    1: {
      opacity: 0,
      transform: [{scale: 0}],
    },
  }),
  /** fade scale */
  fadeInScale: makeAnimation({
    from: {
      opacity: 0,
      transform: [{scale: 10}],
    },
    to: {
      opacity: 1,
      transform: [{scale: 1}],
    },
  }),
  fadeOutScale: makeAnimation({
    0: {
      opacity: 1,
      transform: [{scale: 1}],
    },
    0.5: {
      opacity: 0.1,
      transform: [{scale: 8}],
    },
    1: {
      opacity: 0,
      transform: [{scale: 10}],
    },
  }),
  /** fade transition */
  fadeInDown: makeAnimation({
    from: {
      opacity: 0,
      transform: [{translateY: -30}],
    },
    to: {
      opacity: 1,
      transform: [{translateY: 0}],
    },
  }),
  fadeInUp: makeAnimation({
    from: {
      opacity: 0,
      transform: [{translateY: 30}],
    },
    to: {
      opacity: 1,
      transform: [{translateY: 0}],
    },
  }),
};

export default animations;

/********************************************************************************************************************
 * makeAnimation
 * ******************************************************************************************************************/

function makeAnimation(animation: CustomAnimation) {
  return animation;
}
