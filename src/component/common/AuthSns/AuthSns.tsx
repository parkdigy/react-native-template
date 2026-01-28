import {getProfile as kakaoGetProfile, login as kakaoLogin} from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth, appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import NaverLogin from '@react-native-seoul/naver-login';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import {ImgLastLogin, SnsApple, SnsGoogle, SnsKakao, SnsNaver} from '@asset-image';
import {Text_Accent} from '../Text';
import {type AuthSnsProps as Props} from './AuthSns.types';
import {AuthSnsActivityIndicatorContainer, AuthSnsIconButton} from './AuthSns.style';

const isAppleAuthSupported = isIos ? appleAuth.isSupported : appleAuthAndroid.isSupported;

export const AuthSns = ({
  title,
  titleLine,
  loadingType,
  disabled,
  onLoading,
  onKakaoLogin,
  onNaverLogin,
  onGoogleLogin,
  onAppleLogin,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Variable
   * ******************************************************************************************************************/

  const loading = !!loadingType || disabled;

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const lastLoginType = useMemo(() => storage.getLastLoginType(), []);

  const lastLogin = useMemo(
    () => (
      <View position='absolute' top={-45}>
        <PngImage source={ImgLastLogin} width={70} height={34} />
      </View>
    ),
    [],
  );

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleKakaoPress = useCallback(() => {
    onLoading('KAKAO');

    kakaoLogin()
      .then(({accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt}) => {
        kakaoGetProfile()
          .then((data) => {
            onLoading(undefined);

            onKakaoLogin({
              accessToken,
              accessTokenExp: dayjs(accessTokenExpiresAt).format('YYYY-MM-DD HH:mm:ss'),
              refreshToken,
              refreshTokenExp: dayjs(refreshTokenExpiresAt).format('YYYY-MM-DD HH:mm:ss'),
              email: data.email,
              isEmailVerified: data.isEmailValid && data.isEmailVerified,
            });
          })
          .catch(() => {
            onLoading(undefined);
          });
      })
      .catch((err) => {
        ll(err);
        onLoading(undefined);
        //
      });
  }, [onKakaoLogin, onLoading]);

  const handleNaverPress = useCallback(async () => {
    onLoading('NAVER');

    const loginResponse = await NaverLogin.login().catch(() => undefined);
    if (!loginResponse || !loginResponse.successResponse) {
      onLoading(undefined);
      return;
    }
    if (loginResponse.successResponse) {
      const getProfileResponse = await NaverLogin.getProfile(loginResponse.successResponse.accessToken).catch(
        () => undefined,
      );
      if (!getProfileResponse) {
        onLoading(undefined);
        return;
      }

      if (getProfileResponse.resultcode === '00') {
        onLoading(undefined);

        onNaverLogin({
          accessToken: loginResponse.successResponse.accessToken,
          accessTokenExp: dayjs(
            new Date(Number(loginResponse.successResponse.expiresAtUnixSecondString) * 1000),
          ).format('YYYY-MM-DD HH:mm:ss'),
          refreshToken: loginResponse.successResponse.refreshToken,
          email: getProfileResponse.response.email,
          isEmailVerified: true,
        });
      } else {
        onLoading(undefined);
      }
    } else {
      onLoading(undefined);
    }
  }, [onLoading, onNaverLogin]);

  const handleGooglePress = useCallback(async () => {
    onLoading('GOOGLE');

    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}).catch(() => undefined);
    const signInResponse = await GoogleSignin.signIn().catch(() => undefined);
    if (!signInResponse || !signInResponse.data || !signInResponse.data.idToken) {
      onLoading(undefined);
      return;
    }

    const idToken = signInResponse.data.idToken;

    const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);

    const authInfo = await firebase.auth.signInWithCredential(googleCredential).catch(() => undefined);
    if (!authInfo) {
      onLoading(undefined);
      return;
    }

    const googleIdToken = await firebase.auth.currentUser?.getIdToken().catch(() => undefined);
    if (!googleIdToken) {
      onLoading(undefined);
      return;
    }

    onLoading(undefined);

    if (!authInfo.user.emailVerified || !authInfo.user.email) {
      Dialog.openErrorAlert({
        contentTitle: '이메일 인증 필요',
        content: '인증 받지 않은 이메일은 사용할 수 없습니다. 구글 계정에서 이메일을 인증한 후 다시 시도해 주세요.',
      });

      await firebase.auth.signOut().catch(() => undefined);
    } else {
      onGoogleLogin({
        idToken: googleIdToken,
        email: authInfo.user.email,
        isEmailVerified: authInfo.user.emailVerified,
      });
    }
  }, [onGoogleLogin, onLoading]);

  const handleApplePress = useCallback(async () => {
    onLoading('APPLE');

    let appleAuthIdToken: string | null | undefined;
    let appleAuthNonce: string | undefined;
    const appleAuthNames: string[] = [];

    if (isIos) {
      const performRequestResponse = await appleAuth
        .performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        })
        .catch(() => undefined);
      if (!performRequestResponse) {
        onLoading(undefined);
        return;
      }

      const credentialState = await appleAuth
        .getCredentialStateForUser(performRequestResponse.user)
        .catch(() => undefined);
      if (credentialState === undefined) {
        onLoading(undefined);
        return;
      }

      if (credentialState === appleAuth.State.AUTHORIZED) {
        appleAuthIdToken = performRequestResponse.identityToken;
        appleAuthNonce = performRequestResponse.nonce;

        if (performRequestResponse.fullName?.familyName) {
          appleAuthNames.push(performRequestResponse.fullName.familyName);
        }
        if (performRequestResponse.fullName?.givenName) {
          appleAuthNames.push(performRequestResponse.fullName.givenName);
        }
      }
    } else {
      appleAuthAndroid.configure({
        clientId: 'kr.monstertech.kidsnews.service',
        redirectUri: 'https://kidsnews-b18c7.firebaseapp.com/__/auth/handler',
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: uuid.v4(),
        state: uuid.v4(),
      });

      const signInResponse = await appleAuthAndroid.signIn().catch(() => undefined);
      if (signInResponse === undefined) {
        onLoading(undefined);
        return;
      }

      appleAuthIdToken = signInResponse.id_token;
      appleAuthNonce = signInResponse.nonce;

      if (signInResponse.user?.name?.lastName) {
        appleAuthNames.push(signInResponse.user?.name?.lastName);
      }
      if (signInResponse.user?.name?.firstName) {
        appleAuthNames.push(signInResponse.user?.name?.firstName);
      }
    }

    if (notEmpty(appleAuthIdToken) && appleAuthNonce) {
      const appleCredential = firebase.auth.AppleAuthProvider.credential(appleAuthIdToken, appleAuthNonce);
      const authInfo = await firebase.auth.signInWithCredential(appleCredential).catch(() => undefined);
      if (!authInfo) {
        onLoading(undefined);
        return;
      }
      const appleIdToken = await firebase.auth.currentUser?.getIdToken().catch(() => undefined);

      if (appleIdToken) {
        if (firebase.auth.currentUser && notEmpty(appleAuthNames)) {
          await firebase.auth.currentUser?.updateProfile({displayName: appleAuthNames.join(' ')});
        }

        onLoading(undefined);

        if (!authInfo.user.emailVerified || !authInfo.user.email) {
          Dialog.openErrorAlert({
            contentTitle: '이메일 인증 필요',
            content: '인증 받지 않은 이메일은 사용할 수 없습니다. 애플 계정에서 이메일을 인증한 후 다시 시도해 주세요.',
          });

          await firebase.auth.signOut().catch(() => undefined);
        } else {
          onAppleLogin({
            idToken: appleIdToken,
            email: authInfo.user.email,
            isEmailVerified: authInfo.user.emailVerified,
          });
        }
      } else {
        onLoading(undefined);
      }
    } else {
      onLoading(undefined);
    }
  }, [onAppleLogin, onLoading]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View {...props}>
      {title && (
        <Stack row center spacing={10} mb={24}>
          {titleLine && (
            <View flex={1}>
              <Divider />
            </View>
          )}
          <Text_Accent center flex={titleLine ? undefined : 1}>
            {title}
          </Text_Accent>
          {titleLine && (
            <View flex={1}>
              <Divider />
            </View>
          )}
        </Stack>
      )}

      <View row alignItems='center' justifyContent='space-between' ph={10} opacity={loading ? 0.5 : undefined}>
        <View>
          {lastLoginType === 'KAKAO' && lastLogin}
          <AuthSnsIconButton
            icon={SnsKakao}
            disabled={loading}
            onPress={handleKakaoPress}
            accessibilityLabel='카카오톡 로그인'
          />
          {loadingType === 'KAKAO' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator color='white' />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        <View>
          {lastLoginType === 'NAVER' && lastLogin}
          <AuthSnsIconButton
            icon={SnsNaver}
            disabled={loading}
            onPress={() => {
              handleNaverPress();
            }}
            accessibilityLabel='네이버 로그인'
          />
          {loadingType === 'NAVER' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator color='white' />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        <View>
          {lastLoginType === 'GOOGLE' && lastLogin}
          <AuthSnsIconButton
            icon={SnsGoogle}
            disabled={loading}
            onPress={() => {
              handleGooglePress();
            }}
            accessibilityLabel='구글 로그인'
          />
          {loadingType === 'GOOGLE' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator color='white' />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        {isAppleAuthSupported && (
          <View>
            {lastLoginType === 'APPLE' && lastLogin}
            <AuthSnsIconButton
              icon={SnsApple}
              disabled={loading}
              onPress={() => {
                handleApplePress();
              }}
              accessibilityLabel='애플 로그인'
            />
            {loadingType === 'APPLE' && (
              <AuthSnsActivityIndicatorContainer>
                <ActivityIndicator color='white' />
              </AuthSnsActivityIndicatorContainer>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default AuthSns;
