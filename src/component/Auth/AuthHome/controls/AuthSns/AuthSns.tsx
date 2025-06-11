import React from 'react';
import {getProfile as kakaoGetProfile, login as kakaoLogin} from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {getAuth, GoogleAuthProvider, AppleAuthProvider} from '@react-native-firebase/auth';
import NaverLogin from '@react-native-seoul/naver-login';
import dayjs from 'dayjs';
import {SnsApple, SnsGoogle, SnsKakao, SnsNaver} from '@asset-image';
import {AuthSnsProps as Props} from './AuthSns.types';
import styled from 'styled-components/native';
import {IconButton} from 'react-native-paper';

const firebaseAuth = getAuth();

export const AuthSns = ({
  title,
  titleLine,
  loadingType,
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

  const loading = !!loadingType;

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleKakaoPress = useCallback(() => {
    kakaoLogin()
      .then(({accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt}) => {
        onLoading(true);

        kakaoGetProfile()
          .then((data) => {
            onLoading(false);

            onKakaoLogin({
              accessToken,
              accessTokenExp: dayjs(accessTokenExpiresAt).format('YYYY-MM-DD HH:mm:ss'),
              refreshToken,
              refreshTokenExp: dayjs(refreshTokenExpiresAt).format('YYYY-MM-DD HH:mm:ss'),
              email: ifNullOrUndefined(data.email, undefined),
              isEmailVerified: data.isEmailValid && data.isEmailVerified,
              name: ifNullOrUndefined(data.nickname, undefined),
            });
          })
          .catch(() => {
            onLoading(false);
          });
      })
      .catch((err) => {
        ll(err);
        //
      });
  }, [onKakaoLogin, onLoading]);

  const handleNaverPress = useCallback(async () => {
    try {
      const {successResponse} = await NaverLogin.login();

      if (successResponse) {
        onLoading(true);

        const res = await NaverLogin.getProfile(successResponse.accessToken);
        if (res.resultcode === '00') {
          onLoading(false);

          onNaverLogin({
            accessToken: successResponse.accessToken,
            accessTokenExp: dayjs(new Date(Number(successResponse.expiresAtUnixSecondString) * 1000)).format(
              'YYYY-MM-DD HH:mm:ss',
            ),
            refreshToken: successResponse.refreshToken,
            email: ifNullOrUndefined(res.response.email, undefined),
            isEmailVerified: true,
            name: ifNullOrUndefined(res.response.nickname, undefined),
          });
        } else {
          onLoading(false);
        }
      }
    } catch (err) {
      onLoading(false);
    }
  }, [onLoading, onNaverLogin]);

  const handleGooglePress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {data} = await GoogleSignin.signIn();
      if (data?.idToken) {
        onLoading(true);

        const googleCredential = GoogleAuthProvider.credential(data?.idToken);

        const authInfo = await firebaseAuth.signInWithCredential(googleCredential);

        const googleIdToken = await firebaseAuth.currentUser?.getIdToken();
        if (googleIdToken) {
          onLoading(false);
          onGoogleLogin({
            idToken: googleIdToken,
            email: ifNull(authInfo.user.email, undefined),
            isEmailVerified: authInfo.user.emailVerified,
            name: ifNull(authInfo.user.displayName, undefined),
          });
        } else {
          onLoading(false);
        }
      }
    } catch (err) {
      ll(err);
      onLoading(false);
    }
  }, [onGoogleLogin, onLoading]);

  const handleApplePress = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        onLoading(true);

        const {identityToken, nonce} = appleAuthRequestResponse;
        const appleCredential = AppleAuthProvider.credential(identityToken, nonce);

        const authInfo = await firebaseAuth.signInWithCredential(appleCredential);

        const appleIdToken = await firebaseAuth.currentUser?.getIdToken();

        if (appleIdToken) {
          onLoading(false);
          onAppleLogin({
            idToken: appleIdToken,
            email: ifNull(authInfo.user.email, undefined),
            isEmailVerified: authInfo.user.emailVerified,
            name: ifNull(authInfo.user.displayName, undefined),
          });
        } else {
          onLoading(false);
        }
      }
    } catch (err) {
      onLoading(false);
    }
  }, [onAppleLogin, onLoading]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  const SnsKakaoIconSource = useCallback(() => <SnsKakao />, []);
  const SnsNaverIconSource = useCallback(() => <SnsNaver />, []);
  const SnsGoogleIconSource = useCallback(() => <SnsGoogle />, []);
  const SnsAppleIconSource = useCallback(() => <SnsApple />, []);

  return (
    <View {...props}>
      {title && (
        <Stack row center spacing={10} mb={24}>
          {titleLine && (
            <View flex={1}>
              <Divider />
            </View>
          )}
          <Text_Accent bold center flex={titleLine ? undefined : 1}>
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
          <AuthSnsIconButton icon={SnsKakaoIconSource} disabled={loading} onPress={handleKakaoPress} />
          {loadingType === 'KAKAO' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        <View>
          <AuthSnsIconButton icon={SnsNaverIconSource} disabled={loading} onPress={handleNaverPress} />
          {loadingType === 'NAVER' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        <View>
          <AuthSnsIconButton icon={SnsGoogleIconSource} disabled={loading} onPress={handleGooglePress} />
          {loadingType === 'GOOGLE' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        {appleAuth.isSupported && (
          <View>
            <AuthSnsIconButton icon={SnsAppleIconSource} disabled={loading} onPress={handleApplePress} />
            {loadingType === 'APPLE' && (
              <AuthSnsActivityIndicatorContainer>
                <ActivityIndicator />
              </AuthSnsActivityIndicatorContainer>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default AuthSns;

/********************************************************************************************************************
 * Styled Components
 * ******************************************************************************************************************/

export const AuthSnsIconButton = styled(IconButton)`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

export const AuthSnsActivityIndicatorContainer = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;
