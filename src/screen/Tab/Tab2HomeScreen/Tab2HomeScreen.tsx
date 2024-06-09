import React from 'react';
import {ScreenProps} from '@types';
import {Tab2Home} from '@comp';
import {ScreenBase} from '../../@common';

const Tab2HomeScreen = ({navigation, route}: ScreenProps<'Tab2Home'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '공지사항'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={Tab2Home} topEdgeSafeArea navigation={navigation} route={route} />;
};

export default Tab2HomeScreen;
