import {type ScreenProps} from '@types';
import {NoticeInfo} from '@comp';
import {ScreenBase} from '../@common';

export const NoticeInfoScreen = ({navigation, route}: ScreenProps<'NoticeInfo'>) => {
  return (
    <ScreenBase
      title='공지사항'
      header='blur'
      component={NoticeInfo}
      bottomEdgeSafeArea
      navigation={navigation}
      route={route}
    />
  );
};

export default NoticeInfoScreen;
