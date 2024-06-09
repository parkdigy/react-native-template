/********************************************************************************************************************
 * 인증 API
 * ******************************************************************************************************************/

import api, {API_AUTH_SIGN_IN_PATH} from '@api';
import {AuthSignIn, AuthSignInRequestData, AuthSignupRequestData} from './Auth.types';

export default {
  // 인증 정보
  info(data: Dict) {
    return api.get<AuthSignIn>(API_AUTH_SIGN_IN_PATH, data);
  },
  // 로그인
  signIn(data: AuthSignInRequestData) {
    return api.post<AuthSignIn>(API_AUTH_SIGN_IN_PATH, data);
  },
  // 회원가입
  signUp(data: AuthSignupRequestData) {
    return api.post('auth.signup', data);
  },
  // 로그아웃
  signOut() {
    return api.post('auth.signout');
  },
};
