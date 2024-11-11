/********************************************************************************************************************
 * '더보기 > 테마 설정' 화면 Screen 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ScreenProps} from '@types';
import {ThemeSettings} from '@comp';
import {ScreenBase} from '../@common';

export const ThemeSettingsScreen = ({navigation, route}: ScreenProps<'ThemeSettings'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '테마 설정'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={ThemeSettings} bottomEdgeSafeArea navigation={navigation} route={route} />;
};

export default ThemeSettingsScreen;
