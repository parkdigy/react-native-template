import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomContainerViewProps as Props} from './BottomContainerView.types';

export const BottomContainerView = ({show, inSafeArea, hidden, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {bottom: safeAreaBottomInsert} = useSafeAreaInsets();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View
      animation={hidden ? 'none' : show ? 'fadeInUp' : 'fadeOutDown'}
      opacity={hidden ? 0 : 1}
      duration={500}
      easing='ease-in-out-back'
      p={15}
      pb={15 + (inSafeArea ? 0 : safeAreaBottomInsert)}
      {...props}
    />
  );
};

export default BottomContainerView;
