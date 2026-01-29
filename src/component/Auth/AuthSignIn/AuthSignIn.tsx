import Config from 'react-native-config';
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
import {useAppState} from '@context';
import {type AuthSignInRequestData, type AuthSigninType} from '@const';
import {type AuthSignInProps as Props} from './AuthSignIn.types';
import {StatusBar} from 'react-native';

export const AuthSignIn = ({navigation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {restartApp} = useAppState();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const slideFullScreenViewRef = useRef<SlideFullScreenViewCommand>(null);
  const restartAppWhenHide = useRef(false);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [isShown, setIsShown] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [loadingType, setLoadingType] = useState<AuthSigninType>();
  const [isShowTermsOfPrivacyDialog, setIsShowTermsOfPrivacyDialog] = useState(false);
  const [isShowTermsOfServiceDialog, setIsShowTermsOfServiceDialog] = useState(false);

  /********************************************************************************************************************
   * Variable
   * ******************************************************************************************************************/

  const loading = !!loadingType;

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const hide = useCallback(() => {
    setIsHiding(true);
  }, []);

  const signIn = useCallback(
    (data: AuthSignInRequestData & {name?: string}) => {
      setLoadingType(data.type);

      delayTimeout(() => {
        Const.Auth.signIn(data)
          .then(() => {
            storage.setLastLoginType(data.type);
            storage.user.clearAll();
            restartAppWhenHide.current = true;
            hide();
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
          .finally(() => setLoadingType(undefined));
      });
    },
    [hide],
  );

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

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <SlideFullScreenView
      ref={slideFullScreenViewRef}
      show
      safeArea
      animationType='fade'
      backgroundColor='#000000c0'
      onShown={() => setIsShown(true)}
      onHidden={() => {
        if (restartAppWhenHide.current) {
          restartApp();
        } else {
          navigation.goBack();
        }
      }}>
      <StatusBar animated barStyle='light-content' />

      {isShown && (
        <View flex={1} justifyContent='center'>
          <ContainerView justifyContent='center'>
            <View flex={1} alignItems='center' justifyContent='center' />

            <View
              animation={isHiding ? 'fadeOutDown' : 'fadeInUp'}
              easing={isHiding ? 'ease-in-back' : 'ease-out-back'}
              duration={350}
              onAnimationEnd={() => {
                if (isHiding) {
                  slideFullScreenViewRef.current?.hide();
                }
              }}>
              <View backgroundColor={theme.colors.surface} borderRadius={15} ph={20}>
                <Stack pv={20} spacing={20} center>
                  <View maxWidth={350} fullWidth>
                    <AuthSns
                      disabled={loading}
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
                        onPress={loading ? undefined : () => setIsShowTermsOfServiceDialog(true)}>
                        이용약관
                      </TPrimaryAccent>{' '}
                      및{' '}
                      <TPrimaryAccent
                        bold
                        center
                        onPress={loading ? undefined : () => setIsShowTermsOfPrivacyDialog(true)}>
                        개인정보처리방침
                      </TPrimaryAccent>
                      에 동의합니다.
                    </TAccent>
                  </Stack>

                  <View fullWidth maxWidth={isAndroid ? 280 : 350}>
                    <Button color='secondary' disabled={loading} onPress={hide}>
                      닫기
                    </Button>
                  </View>
                </Stack>
              </View>
            </View>
          </ContainerView>

          <TermsOfPrivacyDialog
            visible={isShowTermsOfPrivacyDialog}
            onRequestClose={() => setIsShowTermsOfPrivacyDialog(false)}
          />
          <TermsOfServiceDialog
            visible={isShowTermsOfServiceDialog}
            onRequestClose={() => setIsShowTermsOfServiceDialog(false)}
          />
        </View>
      )}
    </SlideFullScreenView>
  );
};

export default AuthSignIn;
