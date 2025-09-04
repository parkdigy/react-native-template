import {AppStateStatus, ColorSchemeName} from 'react-native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {AuthInfo, ConfigInfoData} from '@const';
import {FontFamily, Permission, PermissionMap} from '@types';

export type AppForceColorScheme = 'light' | 'dark' | 'system';

export interface AppAuthInfo extends AuthInfo {}

export interface AppContextValue {
  // 인터넷 연결 여부
  isInternetConnected: boolean;
  setIsInternetConnected(isInternetConnected: boolean): void;
  // 운영자 모드 여부
  isOperatorMode: boolean;
  setIsOperatorMode(isOperatorMode: boolean): void;
  // 앱 활성 상태
  appState: AppStateStatus;
  // 폰트
  fontFamily: FontFamily;
  setFontFamily(fontFamily: FontFamily): void;
  // 권한
  permissionMap: PermissionMap;
  requestPermission(permission: Permission): void;
  hasNotificationPermission: boolean;
  requestNotificationPermission(): void;
  // 탭 바
  isUseFloatTabBar: boolean;
  tabBarHeight: number;
  setTabBarHeight(height: number): void;
  // 설정 정보
  config: ConfigInfoData;
  setConfig(config: ConfigInfoData): void;
  reloadConfig(): void;
  // 오늘 날짜
  todayDate: Date;
  todayDateVal: number;
  // 인증
  auth: AppAuthInfo;
  setAuth(auth: AppAuthInfo): void;
  reloadAuth(isLogin?: boolean): Promise<void>;
  clearAuth(): void;
  // 테마
  colorScheme: ColorSchemeName;
  forceColorScheme: AppForceColorScheme;
  setColorScheme(colorScheme: ColorSchemeName): void;
  toggleColorScheme(): void;
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
  // 재시작
  restartApp(): void;
}
