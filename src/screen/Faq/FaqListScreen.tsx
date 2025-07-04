/********************************************************************************************************************
 * 'FAQ 목록' 화면 Screen 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ScreenProps} from '@types';
import {FaqList} from '@comp';
import {ScreenBase} from '../@common';

export const FaqListScreen = ({navigation, route}: ScreenProps<'FaqList'>) => {
  return (
    <ScreenBase
      title='FAQ'
      header='blur'
      component={FaqList}
      bottomEdgeSafeArea
      navigation={navigation}
      route={route}
    />
  );
};

export default FaqListScreen;
