/********************************************************************************************************************
 * '홈' 화면 Screen 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import Config from 'react-native-config';
import {ScreenProps} from '@types';
import {Home} from '@comp';
import {ScreenBase} from '../../@common';

const HomeScreen = ({navigation, route}: ScreenProps<'Home'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: Config.APP_TITLE});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={Home} topEdgeSafeArea navigation={navigation} route={route} />;
};

export default HomeScreen;
