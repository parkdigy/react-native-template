import Config from 'react-native-config';
import {unstable_batchedUpdates} from 'react-native';
import {
  type AppleUserInfo,
  AuthSns,
  type GoogleUserInfo,
  type KakaoUserInfo,
  type NaverUserInfo,
  SlideFullScreenView,
  type SlideFullScreenViewCommand,
  TermsOfPrivacyDialog,
  TermsOfServiceDialog,
} from '@ccomp';
import {ImgSpeechBubbleHello, Logo} from '@asset-image';
import {type AuthSignInRequestData, type AuthSigninType} from '@const';
import {type AppAuthInfo} from '@context';

interface Props {
  isInternetConnected: boolean;
  onSuccess(authInfo: AppAuthInfo): void;
}

export const AppInitializer_Auth_Content = ({onSuccess}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const slideFullScreenViewRef = useRef<SlideFullScreenViewCommand>(null);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [isShown, setIsShown] = useState(false);
  const [authInfo, setAuthInfo] = useState<AppAuthInfo>();
  const [isHiding, setIsHiding] = useState(false);
  const [loadingType, setLoadingType] = useState<AuthSigninType>();
  const [contentAreaHeight, setContentAreaHeight] = useState(0);
  const [isShowTermsOfPrivacyDialog, setIsShowTermsOfPrivacyDialog] = useState(false);
  const [isShowTermsOfServiceDialog, setIsShowTermsOfServiceDialog] = useState(false);

  /********************************************************************************************************************
   * Variable
   * ******************************************************************************************************************/

  const loading = !!loadingType;

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const lastLoginType = useMemo(() => storage.getLastLoginType(), []);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const signIn = useCallback((data: AuthSignInRequestData & {name?: string}) => {
    setLoadingType(data.type);

    delayTimeout(() => {
      Const.Auth.signIn(data)
        .then(({data: signInInfo}) => {
          const signInAuthInfo = signInInfo.auth;

          storage.setLastLoginType(data.type);
          storage.user.init(signInAuthInfo.user_key);

          unstable_batchedUpdates(() => {
            setIsHiding(true);
            setAuthInfo(signInAuthInfo);
          });
        })
        .catch((err) => {
          switch (api.error.getResultCode(err)) {
            case Const.Error.auth.signIn.invalidSnsToken:
            case Const.Error.auth.signIn.notExistsEmail:
              Dialog.openErrorAlert({
                content: api.error.getResultMessage(err) as string,
              });
              break;
            default:
              app.showApiErrorAlert(err, '로그인');
              break;
          }
        })
        .finally(() => {
          setLoadingType(undefined);
        });
    });
  }, []);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleSnsLoading = useCallback((newLoadingType: AuthSigninType) => {
    setLoadingType(newLoadingType);
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

  const handleGuestLogin = useCallback(() => {
    signIn({
      type: 'GUEST',
    });
  }, [signIn]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <SlideFullScreenView
      ref={slideFullScreenViewRef}
      show
      noAnimation
      backgroundColor={theme.colors.background}
      onShown={() => setIsShown(true)}>
      {isShown && (
        <View flex={1} justifyContent='center'>
          <SafeAreaView>
            <ContainerView justifyContent='center'>
              <View flex={1} alignItems='center' justifyContent='center' />

              <View
                animation={isHiding ? 'fadeOutDown' : 'fadeInUp'}
                easing={'ease-out-back'}
                duration={500}
                onLayout={(e) => setContentAreaHeight(e.nativeEvent.layout.height)}>
                <View backgroundColor={theme.colors.surface} borderRadius={15} ph={20}>
                  <Stack pv={20} spacing={20} center>
                    <View maxWidth={350} fullWidth>
                      <AuthSns
                        disabled={loading || isHiding}
                        loadingType={loadingType}
                        onLoading={handleSnsLoading}
                        onKakaoLogin={handleKakaoLogin}
                        onNaverLogin={handleNaverLogin}
                        onGoogleLogin={handleGoogleLogin}
                        onAppleLogin={handleAppleLogin}
                      />
                    </View>

                    <Stack spacing={5} opacity={loading ? 0.5 : 1}>
                      <TAccent center>로그인을 통해 {Config.APP_TITLE}의</TAccent>
                      <TAccent center>
                        <TPrimaryAccent
                          bold
                          center
                          onPress={loading || isHiding ? undefined : () => setIsShowTermsOfServiceDialog(true)}>
                          이용약관
                        </TPrimaryAccent>{' '}
                        및{' '}
                        <TPrimaryAccent
                          bold
                          center
                          onPress={loading || isHiding ? undefined : () => setIsShowTermsOfPrivacyDialog(true)}>
                          개인정보처리방침
                        </TPrimaryAccent>
                        에 동의합니다.
                      </TAccent>
                    </Stack>

                    {(__DEV__ || !lastLoginType || lastLoginType === 'GUEST') && (
                      <View fullWidth maxWidth={isAndroid ? 280 : 350}>
                        <Button
                          color='secondary'
                          size='sm'
                          loading={loadingType === 'GUEST'}
                          disabled={(loading && loadingType !== 'GUEST') || isHiding}
                          onPress={handleGuestLogin}>
                          로그인하지 않고 시작하기
                        </Button>
                      </View>
                    )}
                  </Stack>
                </View>
              </View>
            </ContainerView>
          </SafeAreaView>

          <View
            position='absolute'
            alignItems='center'
            left={0}
            right={0}
            duration={500}
            animation={
              contentAreaHeight === 0
                ? 'none'
                : isHiding
                ? {from: {transform: [{translateY: -contentAreaHeight / 3}]}, to: {transform: [{translateY: 0}]}}
                : {from: {transform: [{translateY: 0}]}, to: {transform: [{translateY: -contentAreaHeight / 3}]}}
            }>
            <View
              animation={isHiding ? 'rotate' : 'none'}
              duration={800}
              direction='reverse'
              easing='ease-in-back'
              onAnimationEnd={() => {
                if (isHiding && authInfo) {
                  onSuccess(authInfo);
                }
              }}>
              <View animation='rotate' duration={800} easing='ease-out-back'>
                <View
                  animation={
                    isHiding ? 'none' : {from: {transform: [{translateY: -2}]}, to: {transform: [{translateY: 2}]}}
                  }
                  iterationCount='infinite'
                  direction='alternate'
                  easing={'ease-in-out'}
                  delay={500}>
                  <Logo width={100} height={100} />
                </View>
              </View>
            </View>

            <View position='absolute' alignItems='center'>
              <View
                animation={isHiding ? 'fadeOut' : 'bounceIn'}
                delay={800}
                duration={isHiding ? 100 : 500}
                left={70}
                top={-70}>
                <ImgSpeechBubbleHello width={80} height={80} />
              </View>
            </View>
          </View>
        </View>
      )}

      <TermsOfPrivacyDialog
        visible={isShowTermsOfPrivacyDialog}
        onRequestClose={() => setIsShowTermsOfPrivacyDialog(false)}
      />
      <TermsOfServiceDialog
        visible={isShowTermsOfServiceDialog}
        onRequestClose={() => setIsShowTermsOfServiceDialog(false)}
      />
    </SlideFullScreenView>
  );
};
