import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import app, {useAppListener} from '@app';
import {ConfigInfoData} from '@const';
import {Text_Accent, Text_White} from '@style';
import AppLogo from './AppLogo';
import AppLogText from './AppLogText';

interface Props {
  config?: ConfigInfoData;
  updatingPercent: number;
  componentReady: boolean;
  onErrorRetry(): void;
}

export const AppSplash = ({config, updatingPercent, componentReady, onErrorRetry}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {bottom: safeAreaBottomInset} = useSafeAreaInsets();
  const appStatus = useAppListener('appStatus');

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  // Splash 화면 숨김 애니메이션
  const hideAnimation = useRef(new Animated.Value(1)).current;

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 앱 상태 변경 시 */
  useEffect(() => {
    if (appStatus === app.AppStatus.CodePushDownloading) {
      // CodePush 다운로드중 상태로 변경 시

      // Splash 표시
      Animated.timing(hideAnimation, {toValue: 1, duration: 0, useNativeDriver: true}).start();
    } else if (appStatus === app.AppStatus.RequiredAppUpdate) {
      // 앱 강제 업데이트 상태로 변경 시

      // Splash 화면 표시
      Animated.timing(hideAnimation, {toValue: 1, duration: 0, useNativeDriver: true}).start();
    }
  }, [appStatus, hideAnimation]);

  /** App 컴포넌트 초기화 완료 시, Splash 화면 숨김 애니메이션 실행 */
  useEffect(() => {
    if (componentReady) {
      // Splash 화면 바로 표시
      Animated.timing(hideAnimation, {toValue: 1, duration: 0, useNativeDriver: true}).start(() => {
        // 앱 상태를 현재 화면 숨김중 상태로 변경
        app.setAppStatus(app.AppStatus.AppSplashHiding);
        // Splash 화면 숨김 애니메이션 실행
        Animated.timing(hideAnimation, {toValue: 0, duration: 100, useNativeDriver: true}).start(() => {
          // 앱 상태를 메인화면 상태로 변경
          app.setAppStatus(app.AppStatus.Main);
        });
      });
    }
  }, [componentReady, hideAnimation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View
      animated
      backgroundColor={theme.colors.splashBackground}
      opacity={hideAnimation}
      position={'absolute'}
      left={0}
      right={0}
      top={0}
      bottom={0}>
      {/* 로고 */}
      <View flex={1} justifyContent='center' alignItems='center'>
        <AppLogo />
      </View>

      <Stack
        spacing={20}
        position='absolute'
        bottom={safeAreaBottomInset + 20}
        left={24}
        right={24}
        alignItems='center'>
        {appStatus === app.AppStatus.LoadError ? (
          // 로드 에러
          <Stack spacing={16} mb={20}>
            <Text_Accent s={13}>서버에 연결할 수 없습니다.</Text_Accent>
            <Button
              backgroundColor={theme.colors.white}
              labelStyle={{color: theme.colors.splashBackground, fontSize: 13, fontWeight: '700'}}
              onPress={onErrorRetry}>
              재시도
            </Button>
          </Stack>
        ) : (
          appStatus === app.AppStatus.RequiredAppUpdate && (
            // 앱 강제 업데이트
            <Stack spacing={16} mb={20}>
              <Text_White s={13}>앱을 최신 버전으로 업데이트 해야합니다.</Text_White>
              <Button
                backgroundColor={theme.colors.primary}
                labelStyle={{color: theme.colors.white, fontSize: 13, fontWeight: '700'}}
                onPress={() => app.openMarketStore(config).then(() => {})}>
                최선 버전 설치하기
              </Button>
            </Stack>
          )
        )}
        {updatingPercent > 0 ? (
          // CodePush 업데이트 퍼센트
          <View backgroundColor='rgba(255,255,255,.3)' height={5} overflow='hidden' borderRadius={5} width='100%'>
            <View backgroundColor={theme.colors.white} height={5} width={`${updatingPercent}%`} />
          </View>
        ) : (
          // 로드에러, 앱 강제 업데이트 상태가 아닌 경우, ActivityIndicator 와 로그 테스트 표시
          !contains([app.AppStatus.LoadError, app.AppStatus.RequiredAppUpdate], appStatus) && (
            <View mb={20}>
              <ActivityIndicator color={theme.colors.white} />
              <AppLogText />
            </View>
          )
        )}
      </Stack>
    </View>
  );
};

export default AppSplash;
