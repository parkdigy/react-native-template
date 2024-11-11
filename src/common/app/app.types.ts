import {MainTabScreenList} from '@types';

export type AppListenerName = 'lockScreen' | 'appStatus' | 'tabRePress';

export const AppStatus = {
  Loading: 'loading',
  LoadError: 'load_error',
  RequiredAppUpdate: 'required_app_update',
  EasUpdateDownloading: 'eas_update_downloading',
  EasUpdateInstalling: 'eas_update_installing',
  EasUpdateChecked: 'eas_update_checked',
  AppSplashHiding: 'app_splash_hiding',
  Auth: 'auth',
  Main: 'main',
} as const;
export type AppStatus = ValueOf<typeof AppStatus>;

export type AppListenerValue<Name extends AppListenerName> = Name extends 'lockScreen'
  ? boolean
  : Name extends 'appStatus'
  ? AppStatus
  : Name extends 'tabRepress'
  ? keyof MainTabScreenList
  : never;

export type AppListenerAppStatusCallback = (appStatus: AppStatus) => void;
export type AppListenerLockScreenCallback = (lockScreen: boolean) => void;
export type AppListenerTabRePressCallback = (name: keyof MainTabScreenList) => void;

export interface AppListeners {
  appStatus: AppListenerAppStatusCallback[];
  lockScreen: AppListenerLockScreenCallback[];
  tabRePress: AppListenerTabRePressCallback[];
}
