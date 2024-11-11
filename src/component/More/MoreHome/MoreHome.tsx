/********************************************************************************************************************
 * '더보기 홈' 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {versionString} from '@pdg/util';
import {Text_Accent, Text_Default, Text_Right100} from '@style';
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
   * Effect
   * ******************************************************************************************************************/

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
    navigation.navigate('AuthStack');
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
                  <Text_Default s={13} w={600} color={theme.colors.surface}>
                    {auth ? '로그아웃' : '로그인'}
                  </Text_Default>
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
              <PanelItem
                title='닉네임'
                indicator
                value={auth.nickname}
                onPress={() => navigation.navigate('MyNicknameChange')}
              />
            </Panel>
          )}

          {/* 공지사항, FAQ */}
          <Panel>
            <PanelItem
              title='공지사항'
              icon='alert-circle-outline'
              indicator
              onPress={() => navigation.navigate('NoticeList')}
            />
            <PanelItem
              title='FAQ'
              icon='help-circle-outline'
              indicator
              onPress={() => navigation.navigate('FaqList')}
            />
          </Panel>

          {/* 테마설정, 알림설정 */}
          <Panel>
            <PanelItem
              title='테마설정'
              icon='brightness-6'
              indicator
              onPress={() => navigation.navigate('ThemeSettings')}
            />
            {auth && (
              <PanelItem
                title='알림설정'
                icon='bell-outline'
                indicator
                onPress={() => navigation.navigate('NotificationSettings')}
              />
            )}
          </Panel>

          {/* 앱 버전 정보 */}
          <Panel>
            <PanelItem
              title='설치버전'
              value={
                <Text_Right100>
                  {DeviceInfo.getVersion()}
                  {Config.APP_ENV !== 'production' && (
                    <>
                      <Text_Right100> ({DeviceInfo.getBuildNumber()})</Text_Right100>
                    </>
                  )}
                </Text_Right100>
              }
            />
            <PanelItem
              title='최신버전'
              value={
                <Stack row center spacing={10}>
                  <Text_Right100>
                    {config.app_version}
                    {Config.APP_ENV !== 'production' && <Text_Right100> ({config.app_build_number})</Text_Right100>}
                  </Text_Right100>
                </Stack>
              }
            />
            {versionString(DeviceInfo.getBuildNumber(), 10, 10) < versionString(config.app_build_number, 10, 10) && (
              <PanelItem>
                <Button mode='outlined' icon={isIos ? 'apple' : 'google-play'} onPress={() => app.openMarketStore()}>
                  최신 버전 다운로드
                </Button>
              </PanelItem>
            )}
          </Panel>

          {/* 약관 및 정책 */}
          <Panel>
            <PanelItem title='이용약관' indicator onPress={() => navigation.navigate('TermsOfService')} />
            <PanelItem title='개인정보처리방침' indicator onPress={() => navigation.navigate('TermsOfPrivacy')} />
          </Panel>

          {/* 회사 정보 */}
          <Panel>
            <PanelItem>
              <Stack spacing={6}>
                <Text_Default s={13}>대표 : Representative</Text_Default>
                <Text_Default s={13}>상호명 : Business Name</Text_Default>
                <Text_Default s={13}>주소 : Address</Text_Default>
                <Text_Default s={13}>사업자등록번호 : 000-00-00000</Text_Default>
                <Text_Default s={13}>메일주소 : Email Address</Text_Default>
              </Stack>
            </PanelItem>
          </Panel>

          {auth && (
            <Button
              mode='text'
              color='primary100'
              labelStyle={{textDecorationLine: 'underline'}}
              onPress={() => navigation.navigate('MyResignForm')}>
              회원탈퇴
            </Button>
          )}
        </Stack>
      </Stack>
    </ContainerScrollView>
  );
};

export default MoreHome;
