/********************************************************************************************************************
 * '로그인' 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {unstable_batchedUpdates, useWindowDimensions} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {Logo} from '@asset-image';
import {useAppState} from '@context';
import {AuthSignInRequestData, AuthSigninType} from '@const';
import {AppleUserInfo, AuthSns, GoogleUserInfo, KakaoUserInfo, NaverUserInfo} from './controls';
import {AuthHomeProps as Props} from './AuthHome.types';

const LOGO_SIZE = {width: 100, height: 90};

const AuthHome = ({navigation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {setAuth, setConfig} = useAppState();
  const {width: windowWidth} = useWindowDimensions();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [loadingType, setLoadingType] = useState<AuthSigninType>();
  const [snsLoading, setSnsLoading] = useState(false);

  /********************************************************************************************************************
   * Variable
   * ******************************************************************************************************************/

  const loading = !!loadingType || snsLoading;

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const logoSize = useMemo(() => {
    const logoWidth = windowWidth * 0.25;
    const scale = logoWidth / LOGO_SIZE.width;

    return {width: LOGO_SIZE.width * scale, height: LOGO_SIZE.height * scale};
  }, [windowWidth]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const signIn = useCallback(
    (data: AuthSignInRequestData & {name?: string}) => {
      setLoadingType(data.type);

      delayTimeout(() => {
        Const.Auth.signIn(data)
          .then(({data: signInInfo}) => {
            unstable_batchedUpdates(() => {
              setAuth(signInInfo.auth);
              setConfig(signInInfo.config);
            });
          })
          .catch((err) => {
            switch (app.getAxiosApiErrorResultCode(err)) {
              case Const.Error.auth.signIn.invalidSnsToken:
                Dialog.openErrorAlert({
                  content: app.getAxiosApiErrorResultMessage(err) as string,
                });
                break;
              default:
                Dialog.openErrorAlert({
                  content: '로그인 중 오류가 발생했습니다.\n잠시 후 재시도 해주세요.',
                  subContent: app.getAxiosApiErrorResultMessage(err),
                  subHiddenContent: app.getAxiosApiErrorResultError(err),
                });
            }
          })
          .finally(() => setLoadingType(undefined));
      });
    },
    [setAuth, setConfig],
  );

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleSnsLoading = useCallback((newSnsLoading: boolean) => {
    setSnsLoading(newSnsLoading);
  }, []);

  const handleKakaoLogin = useCallback(
    (userInfo: KakaoUserInfo) => {
      signIn({
        type: 'KAKAO',
        kakao_access_token: userInfo.accessToken,
        kakao_access_token_exp: userInfo.accessTokenExp,
        kakao_refresh_token: userInfo.refreshToken,
        kakao_refresh_token_exp: userInfo.refreshTokenExp,
      });
    },
    [signIn],
  );

  const handleNaverLogin = useCallback(
    (userInfo: NaverUserInfo) => {
      signIn({
        type: 'NAVER',
        naver_access_token: userInfo.accessToken,
        naver_access_token_exp: userInfo.accessTokenExp,
        naver_refresh_token: userInfo.refreshToken,
      });
    },
    [signIn],
  );

  const handleGoogleLogin = useCallback(
    (userInfo: GoogleUserInfo) => {
      signIn({
        type: 'GOOGLE',
        google_id_token: userInfo.idToken,
      });
    },
    [signIn],
  );

  const handleAppleLogin = useCallback(
    (userInfo: AppleUserInfo) => {
      signIn({type: 'APPLE', apple_id_token: userInfo.idToken});
    },
    [signIn],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <ContainerView>
      <View flex={1} alignItems='center' justifyContent='center'>
        <Logo width={logoSize.width} height={logoSize.height} />
        {Config.APP_ENV !== 'production' && (
          <View mt={10}>
            <TRight200 s={11}>
              {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})
            </TRight200>
          </View>
        )}
      </View>

      <Stack pv={20} spacing={40}>
        <AuthSns
          loadingType={loadingType}
          onLoading={handleSnsLoading}
          onKakaoLogin={handleKakaoLogin}
          onNaverLogin={handleNaverLogin}
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
        />
        <Stack spacing={5} opacity={loading ? 0.5 : 1}>
          <TAccent center>로그인을 통해 {Config.APP_TITLE}의</TAccent>
          <TAccent center>
            <TPrimary bold center onPress={loading ? undefined : () => navigation.navigate('TermsOfService')}>
              이용약관
            </TPrimary>{' '}
            및{' '}
            <TPrimary bold center onPress={loading ? undefined : () => navigation.navigate('TermsOfPrivacy')}>
              개인정보처리방침
            </TPrimary>
            에 동의합니다.
          </TAccent>
        </Stack>
      </Stack>
    </ContainerView>
  );
};

export default AuthHome;
