import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import app, {AppStatus} from '@app';
import {ConfigInfoData} from '@const';
import {Text_Accent, Text_Default} from '@ccomp';
import AppInitializer_Logo from './AppInitializer_Logo';
import AppInitializer_LogText from './AppInitializer_LogText';

interface Props {
  isInternetConnected: boolean;
  appStatus: AppStatus;
  config?: ConfigInfoData;
  detailLogTexts: string[];
  componentReady: boolean;
  onErrorRetry(): void;
}

export const AppInitializer_Splash = ({
  isInternetConnected,
  appStatus,
  config,
  detailLogTexts,
  componentReady,
  onErrorRetry,
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const safeAreaInset = useSafeAreaInsets();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [debugButtonPressCount, setDebugButtonPressCount] = useState(0);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  const animation: ViewProps['animation'] =
    contains([app.AppStatus.EasUpdateDownloading, app.AppStatus.RequiredAppUpdate], appStatus) || !componentReady
      ? 'none'
      : 'fadeOut';

  return (
    <View
      animation={animation}
      backgroundColor={theme.colors.background}
      duration={350}
      position={'absolute'}
      left={0}
      right={0}
      top={0}
      bottom={0}
      onAnimationEnd={() => animation === 'fadeOut' && app.setAppStatus(app.AppStatus.Main)}>
      {/* 로고 */}
      <View flex={1} justifyContent='center' alignItems='center'>
        <AppInitializer_Logo />
      </View>

      <Stack
        spacing={20}
        position='absolute'
        bottom={safeAreaInset.bottom + 20}
        left={24}
        right={24}
        alignItems='center'>
        {contains([app.AppStatus.ConfigError, app.AppStatus.AuthLoadError], appStatus) ? (
          // 로드 에러
          <Stack spacing={16} mb={20}>
            <Text_Default s={13} center>
              {isInternetConnected
                ? '서버에 연결할 수 없습니다.'
                : '서버에 연결할 수 없습니다.\n인터넷 연결 상태를 확인해주세요.'}
            </Text_Default>
            <Button minWidth={150} onPress={onErrorRetry}>
              재시도
            </Button>
          </Stack>
        ) : contains([app.AppStatus.EasUpdateDownloadError], appStatus) ? (
          // 로드 에러
          <Stack spacing={16} mb={20}>
            <Text_Default s={13} center>
              {isInternetConnected
                ? '앱 업데이트에 실패했습니다.'
                : '앱 업데이트에 실패했습니다.\n인터넷 연결 상태를 확인해주세요.'}
            </Text_Default>
            <Button minWidth={150} onPress={onErrorRetry}>
              재시도
            </Button>
          </Stack>
        ) : appStatus === app.AppStatus.RequiredAppUpdate ? (
          // 앱 강제 업데이트
          <Stack spacing={16} mb={20} alignItems='center'>
            <Text_Default s={13} center>
              앱을 최신 버전으로 업데이트 해야합니다.
            </Text_Default>
            <Button minWidth={150} onPress={() => app.openMarketStore(config).then(() => {})}>
              최선 버전 설치하기
            </Button>
          </Stack>
        ) : (
          appStatus === app.AppStatus.InternetConnectionRequired && (
            // 인터넷 연결 필요
            <Stack spacing={16} mb={20} alignItems='center'>
              <Text_Default s={13} center>
                첫 실행시에는 인터넷 연결이 필요합니다.{'\n'}인터넷 연결 후 재시도 해주세요.
              </Text_Default>
              <Button minWidth={150} onPress={onErrorRetry}>
                재시도
              </Button>
            </Stack>
          )
        )}
        {
          // 로드에러, 앱 강제 업데이트 상태가 아닌 경우, ActivityIndicator 와 로그 테스트 표시
          !contains(
            [
              app.AppStatus.ConfigError,
              app.AppStatus.EasUpdateDownloadError,
              app.AppStatus.RequiredAppUpdate,
              app.AppStatus.InternetConnectionRequired,
              app.AppStatus.AuthLoadError,
            ],
            appStatus,
          ) && (
            <View mb={20}>
              <ActivityIndicator color={theme.colors.onSurface} />
              <AppInitializer_LogText appStatus={appStatus} />
              {debugButtonPressCount >= 10 && notEmpty(detailLogTexts) && (
                <Text_Accent s={11} mt={5} center>
                  {detailLogTexts.join('\n')}
                </Text_Accent>
              )}
            </View>
          )
        }
      </Stack>

      <Pressable
        position='absolute'
        left={safeAreaInset.left}
        top={safeAreaInset.top}
        width={100}
        height={100}
        accessibilityLabel='debug'
        onPress={() => setDebugButtonPressCount((prev) => prev + 1)}
      />
    </View>
  );
};
