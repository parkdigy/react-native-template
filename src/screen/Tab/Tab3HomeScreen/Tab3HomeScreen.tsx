import React from 'react';
import {ScreenProps} from '@types';
import {Tab3Home} from '@comp';
import {ScreenBase} from '../../@common';

const Tab3HomeScreen = ({navigation, route}: ScreenProps<'Tab3Home'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '공지사항'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={Tab3Home} topEdgeSafeArea navigation={navigation} route={route} />;
};

export default Tab3HomeScreen;
