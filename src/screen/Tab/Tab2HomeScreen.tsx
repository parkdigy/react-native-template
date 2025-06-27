import React from 'react';
import {ScreenProps} from '@types';
import {Tab2Home} from '@comp';
import {ScreenBase} from '../@common';

export const Tab2HomeScreen = ({navigation, route}: ScreenProps<'Tab2Home'>) => {
  return <ScreenBase title='Tab 2' header='blur' component={Tab2Home} navigation={navigation} route={route} />;
};

export default Tab2HomeScreen;
