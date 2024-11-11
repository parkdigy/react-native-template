import React from 'react';
import {getProfile as kakaoGetProfile, login as kakaoLogin} from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import FirebaseAuth from '@react-native-firebase/auth';
import NaverLogin from '@react-native-seoul/naver-login';
import dayjs from 'dayjs';
import {SnsApple, SnsGoogle, SnsKakao, SnsNaver} from '@image';
import {Text_Accent} from '@style';
import {AuthSnsProps as Props} from './AuthSns.types';
import {AuthSnsActivityIndicatorContainer, AuthSnsIconButton} from './AuthSns.style';

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

        const googleCredential = FirebaseAuth.GoogleAuthProvider.credential(data?.idToken);

        const authInfo = await FirebaseAuth().signInWithCredential(googleCredential);

        const googleIdToken = await FirebaseAuth().currentUser?.getIdToken();
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
        const appleCredential = FirebaseAuth.AppleAuthProvider.credential(identityToken, nonce);

        const authInfo = await FirebaseAuth().signInWithCredential(appleCredential);

        const appleIdToken = await FirebaseAuth().currentUser?.getIdToken();

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

  return (
    <View {...props}>
      {title && (
        <Stack row center spacing={10} mb={24}>
          {titleLine && (
            <View flex={1}>
              <Divider />
            </View>
          )}
          <Text_Accent w={600} center flex={titleLine ? undefined : 1}>
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
          <AuthSnsIconButton icon={SnsKakao} disabled={loading} onPress={handleKakaoPress} />
          {loadingType === 'KAKAO' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        <View>
          <AuthSnsIconButton icon={SnsNaver} disabled={loading} onPress={handleNaverPress} />
          {loadingType === 'NAVER' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        <View>
          <AuthSnsIconButton icon={SnsGoogle} disabled={loading} onPress={handleGooglePress} />
          {loadingType === 'GOOGLE' && (
            <AuthSnsActivityIndicatorContainer>
              <ActivityIndicator />
            </AuthSnsActivityIndicatorContainer>
          )}
        </View>
        {isIos && appleAuth.isSupported && (
          <View>
            <AuthSnsIconButton icon={SnsApple} disabled={loading} onPress={handleApplePress} />
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
