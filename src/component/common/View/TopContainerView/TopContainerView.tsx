import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hasNotch} from 'react-native-device-info';
import {TopContainerViewProps as Props} from './TopContainerView.types';

export const TopContainerView = ({show, noAnimation, inSafeArea, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {top: safeAreaTopInsert} = useSafeAreaInsets();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View
      animation={noAnimation ? 'none' : show ? 'fadeInDown' : 'fadeOutUp'}
      delay={700}
      duration={500}
      easing='ease-in-out-back'
      p={15}
      pt={(hasNotch() ? 5 : 15) + (inSafeArea ? 0 : safeAreaTopInsert)}
      {...props}
    />
  );
};

export default TopContainerView;
