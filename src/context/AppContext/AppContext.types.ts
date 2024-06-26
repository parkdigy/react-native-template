import {AppStateStatus, ColorSchemeName} from 'react-native';
import {AuthInfo, ConfigInfoData} from '@const';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack/src/types';

export type AppForceColorScheme = 'light' | 'dark' | 'system';

export interface AppAuthInfo extends AuthInfo {}

export interface AppContextValue {
  commonStackNavigationOptions: NativeStackNavigationOptions;
  auth?: AppAuthInfo;
  colorScheme: ColorSchemeName;
  forceColorScheme: AppForceColorScheme;
  config: ConfigInfoData;
  appState: AppStateStatus;
  adid: string | null;
  adidLoading: boolean;
  reloadAuth(isLogin?: boolean): Promise<boolean>;
  setAuth(auth: AppAuthInfo): void;
  clearAuth(): void;
  reloadFcmToken(openSettings?: boolean): Promise<boolean>;
  setConfig(config: ConfigInfoData): void;
  reloadConfig(): void;
  setColorScheme(colorScheme: ColorSchemeName): void;
  setForceColorScheme(forceColorScheme: AppForceColorScheme): void;
  setAdid(adid: string): void;
  setAdidLoading(loading: boolean): void;
}
