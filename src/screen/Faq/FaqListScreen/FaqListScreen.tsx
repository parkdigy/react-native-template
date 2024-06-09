/********************************************************************************************************************
 * 'FAQ 목록' 화면 Screen 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ScreenProps} from '@types';
import {FaqList} from '@comp';
import {ScreenBase} from '../../@common';

const FaqListScreen = ({navigation, route}: ScreenProps<'FaqList'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: 'FAQ'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={FaqList} navigation={navigation} route={route} />;
};

export default FaqListScreen;
