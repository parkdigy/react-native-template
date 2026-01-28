import {type ScreenProps} from '@types';
import {MoreHome} from '@comp';
import {ScreenBase} from '../@common';

export const MoreHomeScreen = ({navigation, route}: ScreenProps<'MoreHome'>) => {
  return <ScreenBase title='더보기' header='blur' component={MoreHome} navigation={navigation} route={route} />;
};

export default MoreHomeScreen;
