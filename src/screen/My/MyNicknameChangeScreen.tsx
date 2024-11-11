import React from 'react';
import {ScreenProps} from '@types';
import {MyNicknameChange} from '@comp';
import {ScreenBase} from '../@common';

export const MyNicknameChangeScreen = ({navigation, route}: ScreenProps<'MyNicknameChange'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '이름 변경'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={MyNicknameChange} navigation={navigation} route={route} />;
};

export default MyNicknameChangeScreen;
