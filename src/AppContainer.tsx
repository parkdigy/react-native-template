/********************************************************************************************************************
 * 루트 App 컴포넌트
 * - src/index.ts 에서 사용
 * - Android : NavigationBar 의 높이를 계산한 후 CodePushApp 컴포넌트 표시
 * - iOS : CodePushApp 컴포넌트 바로 표시
 * ******************************************************************************************************************/

import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {StatusBar, Dimensions} from 'react-native';
import app from '@app';
import CodePushApp from './CodePushApp';

interface Props {
  notificationData?: Dict<string | object | number>;
}

const AppContainer = ({notificationData}: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // NavigationBar 높이
  const [navigationBarHeight, setNavigationBarHeight] = useState<number | undefined>(isIos ? 0 : undefined);

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
      <SafeAreaProvider
        onLayout={
          isAndroid
            ? (e) => {
                if (navigationBarHeight === undefined) {
                  setNavigationBarHeight(
                    Dimensions.get('screen').height - e.nativeEvent.layout.height - (StatusBar.currentHeight || 0),
                  );
                }
              }
            : undefined
        }
        style={{backgroundColor: app.color.CoverScreenBackground}}>
        {navigationBarHeight !== undefined && <CodePushApp navigationBarHeight={navigationBarHeight} />}
      </SafeAreaProvider>
    </>
  );
};

export default AppContainer;
