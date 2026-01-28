/********************************************************************************************************************
 * '더보기 > 테마 설정' 화면 Screen 컴포넌트
 * ******************************************************************************************************************/

import {type ScreenProps} from '@types';
import {NotificationSettings} from '@comp';
import {ScreenBase} from '../@common';

export const NotificationSettingsScreen = ({navigation, route}: ScreenProps<'NotificationSettings'>) => {
  return (
    <ScreenBase
      title='알림 설정'
      header='blur'
      component={NotificationSettings}
      bottomEdgeSafeArea
      navigation={navigation}
      route={route}
    />
  );
};

export default NotificationSettingsScreen;
