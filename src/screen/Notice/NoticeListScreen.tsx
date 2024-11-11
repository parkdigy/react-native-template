/********************************************************************************************************************
 * '더보기 > 공지사항' 화면 Screen 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ScreenProps} from '@types';
import {NoticeList} from '@comp';
import {ScreenBase} from '../@common';

export const NoticeListScreen = ({navigation, route}: ScreenProps<'NoticeList'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '공지사항'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={NoticeList} bottomEdgeSafeArea navigation={navigation} route={route} />;
};

export default NoticeListScreen;
