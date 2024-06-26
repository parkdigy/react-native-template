/********************************************************************************************************************
 * '더보기 홈' 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import codePush, {LocalPackage} from 'react-native-code-push';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {versionString} from '@pdg/util';
import {Text_13, Text_13_W600, Text_Accent, Text_Right100} from '@style';
import {useAppState} from '@context';
import {MoreHomeProps as Props} from './MoreHome.types';

const MoreHome = ({navigation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {auth, clearAuth, config} = useAppState();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const containerScrollViewRef = useRef<NativeScrollView>(null);
  const isActiveRef = useRef(false);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [codePushMetaData, setCodePushMetaData] = useState<LocalPackage | null>(null);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (Config.APP_ENV !== 'production') {
      codePush.getUpdateMetadata().then((data) => {
        setCodePushMetaData(data);
      });
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      if (isActiveRef.current) {
        containerScrollViewRef.current?.scrollTo({x: 0, y: 0});
      }
    };
    app.addListener('tabRePress', handler);
    return () => {
      app.removeListener('tabRePress', handler);
    };
  }, []);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleSigninPress = useCallback(() => {
    app.navigate(navigation, 'AuthHome');
  }, [navigation]);

  const handleSignOutPress = useCallback(() => {
    Dialog.openConfirm({
      icon: 'info',
      content: <Text_Accent>로그아웃 하시겠습니까?</Text_Accent>,
      cancelLabel: '취소',
      confirmLabel: '로그아웃',
      onConfirm() {
        Const.Auth.signOut().finally(() => {
          clearAuth();
        });
      },
    });
  }, [clearAuth]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <ContainerScrollView ref={containerScrollViewRef} overflow='hidden'>
      <Stack spacing={24}>
        <HomeTitle
          right={
            <View m={-10}>
              <TouchableOpacity onPress={auth ? handleSignOutPress : handleSigninPress} p={10}>
                <Stack row center backgroundColor={theme.colors.onSurface} pv={6} ph={10} borderRadius={4}>
                  <Text_13_W600 color={theme.colors.surface}>{auth ? '로그아웃' : '로그인'}</Text_13_W600>
                </Stack>
              </TouchableOpacity>
            </View>
          }>
          더보기
        </HomeTitle>

        {/* 내 프로필 */}
        <Stack spacing={16}>
          {auth && (
            <Panel>
              <PanelItem indicator value={auth.nickname} onPress={() => app.navigate(navigation, 'MyNicknameChange')}>
                닉네임
              </PanelItem>
            </Panel>
          )}

          {/* 공지사항, FAQ */}
          <Panel>
            <PanelItem icon='alert-circle-outline' indicator onPress={() => app.navigate(navigation, 'NoticeList')}>
              공지사항
            </PanelItem>
            <PanelItem icon='help-circle-outline' indicator onPress={() => app.navigate(navigation, 'FaqList')}>
              FAQ
            </PanelItem>
          </Panel>

          {/* 테마설정, 알림설정 */}
          <Panel>
            <PanelItem icon='brightness-6' indicator onPress={() => app.navigate(navigation, 'ThemeSettings')}>
              테마설정
            </PanelItem>
            {auth && (
              <PanelItem icon='bell-outline' indicator onPress={() => app.navigate(navigation, 'NotificationSettings')}>
                알림설정
              </PanelItem>
            )}
          </Panel>

          {/* 앱 버전 정보 */}
          <Panel>
            <PanelItem
              value={
                <Text_Right100>
                  {DeviceInfo.getVersion()}
                  {Config.APP_ENV !== 'production' && (
                    <>
                      <Text_Right100> ({DeviceInfo.getBuildNumber()})</Text_Right100>
                      {codePushMetaData && <Text_Right100> ({codePushMetaData.label})</Text_Right100>}
                    </>
                  )}
                </Text_Right100>
              }>
              설치버전
            </PanelItem>
            <PanelItem
              value={
                <Stack row center spacing={10}>
                  <Text_Right100>
                    {config.app_version}
                    {Config.APP_ENV !== 'production' && <Text_Right100> ({config.app_build_number})</Text_Right100>}
                  </Text_Right100>
                </Stack>
              }>
              최신버전
            </PanelItem>
            {versionString(DeviceInfo.getBuildNumber(), 10, 10) < versionString(config.app_build_number, 10, 10) && (
              <PanelItem>
                <Button mode='outlined' onPress={() => app.openMarketStore()}>
                  {Platform.OS === 'ios' ? (
                    <Icon name='apple' size={16} />
                  ) : (
                    Platform.OS === 'android' && <Icon name='google-play' size={16} />
                  )}{' '}
                  최신 버전 다운로드
                </Button>
              </PanelItem>
            )}
          </Panel>

          {/* 약관 및 정책 */}
          <Panel>
            <PanelItem indicator onPress={() => app.navigate(navigation, 'TermsOfService')}>
              이용약관
            </PanelItem>
            <PanelItem indicator onPress={() => app.navigate(navigation, 'TermsOfPrivacy')}>
              개인정보처리방침
            </PanelItem>
          </Panel>

          {/* 회사 정보 */}
          <Panel>
            <PanelItem>
              <Stack
                spacing={6}
                borderRadius={10}
                borderWidth={1}
                borderColor={theme.colors.opacity05}
                backgroundColor={theme.colors.opacityReverse50}>
                <Text_13>대표 : Representative</Text_13>
                <Text_13>상호명 : Business Name</Text_13>
                <Text_13>주소 : Address</Text_13>
                <Text_13>사업자등록번호 : 000-00-00000</Text_13>
                <Text_13>메일주소 : Email Address</Text_13>
              </Stack>
            </PanelItem>
          </Panel>

          {auth && (
            <Button
              mode='text'
              color='primary100'
              labelStyle={{textDecorationLine: 'underline'}}
              onPress={() => app.navigate(navigation, 'MyResignForm')}>
              회원탈퇴
            </Button>
          )}
        </Stack>
      </Stack>
    </ContainerScrollView>
  );
};

export default MoreHome;
