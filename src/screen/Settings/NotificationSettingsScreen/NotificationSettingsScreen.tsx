/********************************************************************************************************************
 * '더보기 > 테마 설정' 화면 Screen 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ScreenProps} from '@types';
import {NotificationSettings} from '@comp';
import {ScreenBase} from '../../@common';

const NotificationSettingsScreen = ({navigation, route}: ScreenProps<'NotificationSettings'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '알림 설정'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={NotificationSettings} navigation={navigation} route={route} />;
};

export default NotificationSettingsScreen;
