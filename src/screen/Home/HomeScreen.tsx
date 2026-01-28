import {type ScreenProps} from '@types';
import {Home} from '@comp';
import {ScreenBase} from '../@common';

export const HomeScreen = ({navigation, route}: ScreenProps<'Home'>) => {
  return <ScreenBase title='홈' header='blur' component={Home} navigation={navigation} route={route} />;
};

export default HomeScreen;
