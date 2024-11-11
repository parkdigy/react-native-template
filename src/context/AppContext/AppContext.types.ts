import {AppStateStatus, ColorSchemeName} from 'react-native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {AuthInfo, ConfigInfoData} from '@const';
import {FontFamily} from '@types';

export type AppForceColorScheme = 'light' | 'dark' | 'system';

export interface AppAuthInfo extends AuthInfo {}

export interface AppContextValue {
  // 앱 활성 상태
  appState: AppStateStatus;
  // 폰트
  fontFamily: FontFamily;
  setFontFamily(fontFamily: FontFamily): void;
  // 설정 정보
  config: ConfigInfoData;
  setConfig(config: ConfigInfoData): void;
  reloadConfig(): void;
  // 인증
  auth?: AppAuthInfo;
  setAuth(auth: AppAuthInfo): void;
  reloadAuth(isLogin?: boolean): Promise<boolean>;
  clearAuth(): void;
  // 테마
  colorScheme: ColorSchemeName;
  forceColorScheme: AppForceColorScheme;
  setColorScheme(colorScheme: ColorSchemeName): void;
  setForceColorScheme(forceColorScheme: AppForceColorScheme): void;
  // 공통 스택 네비게이션 옵션
  commonStackNavigationOptions: NativeStackNavigationOptions;
  // adid
  adid: string | null;
  adidLoading: boolean;
  setAdid(adid: string): void;
  setAdidLoading(loading: boolean): void;
  // fcm
  reloadFcmToken(openSettings?: boolean): Promise<boolean>;
}
