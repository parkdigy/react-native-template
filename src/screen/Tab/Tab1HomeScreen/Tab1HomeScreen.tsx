import React from 'react';
import {ScreenProps} from '@types';
import {Tab1Home} from '@comp';
import {ScreenBase} from '../../@common';

const Tab1HomeScreen = ({navigation, route}: ScreenProps<'Tab1Home'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '공지사항'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase component={Tab1Home} topEdgeSafeArea navigation={navigation} route={route} />;
};

export default Tab1HomeScreen;
