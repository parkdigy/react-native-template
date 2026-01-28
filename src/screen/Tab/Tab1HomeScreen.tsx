import {type ScreenProps} from '@types';
import {Tab1Home} from '@comp';
import {ScreenBase} from '../@common';

export const Tab1HomeScreen = ({navigation, route}: ScreenProps<'Tab1Home'>) => {
  return <ScreenBase title='Tab 1' header='blur' component={Tab1Home} navigation={navigation} route={route} />;
};

export default Tab1HomeScreen;
