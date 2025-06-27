import React from 'react';
import {ScreenProps} from '@types';
import {MyResignForm} from '@comp';
import {ScreenBase} from '../@common';

export const MyResignFormScreen = ({navigation, route}: ScreenProps<'MyResignForm'>) => {
  return (
    <ScreenBase
      title='회원 탈퇴'
      header='blur'
      component={MyResignForm}
      bottomEdgeSafeArea
      navigation={navigation}
      route={route}
    />
  );
};

export default MyResignFormScreen;
