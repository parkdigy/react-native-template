import {ApiResult} from '@api';
import {ConfigInfoData} from '../Common';

export type AuthSigninType = 'GUEST' | 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';

/********************************************************************************************************************
 * 인증 정보
 * ******************************************************************************************************************/

export interface AuthInfo {
  reg_type: AuthSigninType;
  user_key: string;
  email: string;
  name: string | null;
  nickname: string;
  is_push_notification: boolean;
}

/********************************************************************************************************************
 * 로그인
 * ******************************************************************************************************************/

export interface AuthSignInRequestData {
  type: AuthSigninType;
  kakao_access_token?: string;
  kakao_access_token_exp?: string;
  kakao_refresh_token?: string;
  kakao_refresh_token_exp?: string;
  naver_access_token?: string;
  naver_access_token_exp?: string;
  naver_refresh_token?: string;
  google_id_token?: string;
  apple_id_token?: string;
}

export interface AuthSignIn extends ApiResult {
  data: {auth: AuthInfo; config: ConfigInfoData};
}

/********************************************************************************************************************
 * 회원가입
 * ******************************************************************************************************************/

export interface AuthSignupRequestData {
  type: AuthSigninType;
  kakao_access_token?: string;
  kakao_access_token_exp?: string;
  kakao_refresh_token?: string;
  kakao_refresh_token_exp?: string;
  naver_access_token?: string;
  naver_access_token_exp?: string;
  naver_refresh_token?: string;
  google_id_token?: string;
  apple_id_token?: string;
}
