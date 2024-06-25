/********************************************************************************************************************
 * 루트 App 컴포넌트
 * - src/index.ts 에서 사용
 * - Android : NavigationBar 의 높이를 계산한 후 AppCodePush 컴포넌트 표시
 * - iOS : AppCodePush 컴포넌트 바로 표시
 * ******************************************************************************************************************/

import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {StatusBar} from 'react-native';
import app from '@app';
import AppCodePush from './AppCodePush';

interface Props {
  notificationData?: Dict<string | object | number>;
}

const AppContainer = ({notificationData}: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 푸시 알림 데이터 설정 */
  useEffect(() => {
    app.notification.setInitData(notificationData);
  }, [notificationData]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={app.color.CoverScreenBackground} />
      <SafeAreaProvider style={{backgroundColor: app.color.CoverScreenBackground}}>
        <AppCodePush />
      </SafeAreaProvider>
    </>
  );
};

export default AppContainer;
