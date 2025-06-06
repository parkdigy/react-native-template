/********************************************************************************************************************
 * '더보기 > 공지사항 > 상세' 화면 Screen 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ScreenProps} from '@types';
import {NoticeInfo} from '@comp';
import {ScreenBase} from '../@common';

export const NoticeInfoScreen = ({navigation, route}: ScreenProps<'NoticeInfo'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '공지사항'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={NoticeInfo} bottomEdgeSafeArea navigation={navigation} route={route} />;
};

export default NoticeInfoScreen;
