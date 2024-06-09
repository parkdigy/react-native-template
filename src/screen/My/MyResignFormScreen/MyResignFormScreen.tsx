import React from 'react';
import {ScreenProps} from '@types';
import {MyResignForm} from '@comp';
import {ScreenBase} from '../../@common';

const MyResignFormScreen = ({navigation, route}: ScreenProps<'MyResignForm'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '회원 탈퇴'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={MyResignForm} bottomEdgeSafeArea navigation={navigation} route={route} />;
};

export default MyResignFormScreen;
