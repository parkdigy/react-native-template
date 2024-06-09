import React from 'react';
import {ScreenProps} from '@types';
import {MoreHome} from '@comp';
import {ScreenBase} from '../../@common';

const MoreHomeScreen = ({navigation, route}: ScreenProps<'MoreHome'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: 'MY'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={MoreHome} topEdgeSafeArea navigation={navigation} route={route} />;
};

export default MoreHomeScreen;
