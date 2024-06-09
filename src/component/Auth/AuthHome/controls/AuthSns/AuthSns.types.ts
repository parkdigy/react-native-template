import {AuthSigninType} from '@const';

export interface KakaoUserInfo {
  accessToken: string;
  accessTokenExp: string;
  refreshToken: string;
  refreshTokenExp: string;
  email?: string;
  isEmailVerified: boolean;
  name?: string;
}

export interface NaverUserInfo {
  accessToken: string;
  accessTokenExp: string;
  refreshToken: string;
  email?: string;
  isEmailVerified: boolean;
  name?: string;
}

export interface GoogleUserInfo {
  idToken: string;
  email?: string;
  isEmailVerified: boolean;
  name?: string;
}

export interface AppleUserInfo {
  idToken: string;
  email?: string;
  isEmailVerified: boolean;
  name?: string;
}

export interface AuthSnsProps extends PartialOmit<ViewProps, 'children'> {
  title?: string;
  titleLine?: boolean;
  loadingType?: AuthSigninType;
  onLoading(loading: boolean): void;
  onKakaoLogin(kakaoUserInfo: KakaoUserInfo): void;
  onNaverLogin(naverUserInfo: NaverUserInfo): void;
  onGoogleLogin(googleUserInfo: GoogleUserInfo): void;
  onAppleLogin(appleUserInfo: AppleUserInfo): void;
}
