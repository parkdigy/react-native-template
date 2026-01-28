import {type ScreenProps} from '@types';
import {Tab3Home} from '@comp';
import {ScreenBase} from '../@common';

export const Tab3HomeScreen = ({navigation, route}: ScreenProps<'Tab3Home'>) => {
  return <ScreenBase title='Tab 3' header='blur' component={Tab3Home} navigation={navigation} route={route} />;
};

export default Tab3HomeScreen;
