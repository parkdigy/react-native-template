import {AppStateStatus, ColorSchemeName} from 'react-native';
import {AuthInfo, ConfigInfoData} from '@const';

export type AppForceColorScheme = 'light' | 'dark' | 'system';

export interface AppAuthInfo extends AuthInfo {}

export interface AppContextValue {
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

export const AppContextDefaultValue: AppContextValue = {
  appState: 'active',
  colorScheme: 'light',
  forceColorScheme: 'light',
  config: {} as any,
  adid: null,
  adidLoading: true,
  reloadAuth() {
    return Promise.resolve(false);
  },
  setAuth() {},
  clearAuth() {},
  reloadFcmToken: () => Promise.resolve(false),
  setConfig() {},
  reloadConfig() {},
  setColorScheme() {},
  setForceColorScheme() {},
  setAdid() {},
  setAdidLoading() {},
};
