/********************************************************************************************************************
 * '더보기 홈' 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {useAppState} from '@context';
import {MoreHomeProps as Props} from './MoreHome.types';
import {SvgImage, Text_Default} from '@ccomp';
import {IconUser, SnsApple, SnsGoogle, SnsKakao, SnsNaver} from '@asset-image';

const MoreHome = ({navigation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const {auth, clearAuth, config, isUseFloatTabBar, tabBarHeight} = useAppState();

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
   * Memo
   * ******************************************************************************************************************/

  const snsInfo = useMemo(() => {
    switch (auth.reg_type) {
      case 'GUEST':
        return {icon: IconUser, iconFill: theme.colors.panelTitle, title: '비회원'};
      case 'KAKAO':
        return {icon: SnsKakao, title: '카카오'};
      case 'NAVER':
        return {icon: SnsNaver, title: '네이버'};
      case 'GOOGLE':
        return {icon: SnsGoogle, title: '구글'};
      case 'APPLE':
        return {icon: SnsApple, title: '애플'};
    }
  }, [auth.reg_type, theme.colors.panelTitle]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const snsLogin = useCallback(() => {
    app.navigate(navigation, 'AuthSignIn');
  }, [navigation]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleSignOutPress = useCallback(() => {
    Dialog.openConfirm({
      icon: 'info',
      content: '로그아웃 하시겠습니까?',
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
    <ContainerScrollView
      ref={containerScrollViewRef}
      contentContainerStyle={isUseFloatTabBar ? {paddingBottom: tabBarHeight} : undefined}
      scrollIndicatorInsets={isUseFloatTabBar ? {bottom: tabBarHeight - safeAreaInsets.bottom} : undefined}>
      <Stack spacing={24}>
        {/* 내 프로필 */}
        <Stack spacing={16}>
          <Panel>
            <PanelItem
              icon={
                <SvgImage
                  source={snsInfo.icon}
                  fill={ifUndefined(snsInfo.iconFill, 'none')}
                  autoTabletSize
                  width={18}
                  height={18}
                />
              }
              title={
                <TAccent>
                  {auth.reg_type === 'GUEST' ? (
                    <>로그인해 주세요</>
                  ) : (
                    <>
                      <TAccent bold>{auth.name}</TAccent> 님 안녕하세요!
                    </>
                  )}
                </TAccent>
              }
              subTitle={
                auth.reg_type === 'GUEST'
                  ? undefined
                  : !auth.email
                  ? undefined
                  : auth.email.includes('@privaterelay.appleid.com')
                  ? undefined
                  : auth.email
              }
              subTitleOpacity={0.5}
              value={
                auth.reg_type === 'GUEST' ? (
                  <Button size='xs' onPress={snsLogin}>
                    로그인
                  </Button>
                ) : (
                  <TouchableOpacity p={px.s10} m={px.s_10} onPress={handleSignOutPress}>
                    <TGray s={12} textDecorationLine='underline'>
                      로그아웃
                    </TGray>
                  </TouchableOpacity>
                )
              }
            />
            {auth.reg_type !== 'GUEST' && (
              <PanelItem
                title='닉네임'
                indicator
                value={auth.nickname}
                onPress={() => navigation.navigate('MyNicknameChange')}
              />
            )}
          </Panel>

          {/* 공지사항, FAQ */}
          <Panel>
            <PanelItem
              title='공지사항'
              icon='megaphone-outline'
              indicator
              onPress={() => navigation.navigate('NoticeList')}
            />
            <PanelItem
              title='FAQ'
              icon='chatbubbles-outline'
              indicator
              onPress={() => navigation.navigate('FaqList')}
            />
          </Panel>

          {/* 테마설정, 알림설정 */}
          <Panel>
            <PanelItem
              title='테마설정'
              icon='contrast'
              indicator
              onPress={() => navigation.navigate('ThemeSettings')}
            />
            <PanelItem
              title='알림설정'
              icon='notifications-outline'
              indicator
              onPress={() => navigation.navigate('NotificationSettings')}
            />
          </Panel>

          {/* 앱 버전 정보 */}
          <Panel>
            <PanelItem
              title='설치버전'
              value={
                <TRight100>
                  {DeviceInfo.getVersion()}
                  {Config.APP_ENV !== 'production' && (
                    <>
                      <TRight100> ({DeviceInfo.getBuildNumber()})</TRight100>
                    </>
                  )}
                </TRight100>
              }
            />
            <PanelItem
              title='최신버전'
              value={
                <Stack row center spacing={10}>
                  <TRight100>
                    {config.app_version}
                    {Config.APP_ENV !== 'production' && <TRight100> ({config.app_build_number})</TRight100>}
                  </TRight100>
                </Stack>
              }
            />
            {util.format.version(DeviceInfo.getBuildNumber(), 10, 10) <
              util.format.version(config.app_build_number, 10, 10) && (
              <PanelItem>
                <Button
                  mode='outlined'
                  icon={isIos ? 'logo-apple' : 'logo-google-playstore'}
                  onPress={() => app.openMarketStore()}>
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
                <Text_Default s={13}>대표: Representative</Text_Default>
                <Text_Default s={13}>회사명: Business Name</Text_Default>
                <Text_Default s={13}>주소: Address</Text_Default>
                <Text_Default s={13}>사업자등록번호: 000-00-00000</Text_Default>
                <Text_Default s={13}>메일주소: Email Address</Text_Default>
              </Stack>
            </PanelItem>
          </Panel>

          {auth && auth.reg_type !== 'GUEST' && (
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
