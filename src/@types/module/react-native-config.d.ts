declare module 'react-native-config' {
  export interface NativeConfig {
    APP_ENV: 'development' | 'staging' | 'production';
    APP_TITLE: string;
    // api
    API_BASE_URL: string;
    API_BASE_URL_SIMULATOR: string;
    // firebase authentication google
    GOOGLE_SIGN_IN_WEB_CLIENT_ID: string;
    // naver login
    NAVER_LOGIN_CLIENT_KEY: string;
    NAVER_LOGIN_CLIENT_SECRET: string;
    NAVER_LOGIN_URL_SCHEME_IOS: string;
    // import
    IMPORT_USER_CODE: string;
    // test
    TEST_IOS_ADID: string | undefined;
    TEST_AOS_ADID: string | undefined;
  }

  export const Config: NativeConfig;
  export default Config;
}
