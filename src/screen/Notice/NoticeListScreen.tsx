import React from 'react';
import {ScreenProps} from '@types';
import {NoticeList} from '@comp';
import {ScreenBase} from '../@common';

export const NoticeListScreen = ({navigation, route}: ScreenProps<'NoticeList'>) => {
  return (
    <ScreenBase
      title='공지사항'
      header='blur'
      component={NoticeList}
      bottomEdgeSafeArea
      navigation={navigation}
      route={route}
    />
  );
};

export default NoticeListScreen;
