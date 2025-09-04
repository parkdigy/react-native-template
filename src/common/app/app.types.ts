import {MainTabScreenList} from '@types';

export type AppListenerName = 'lockScreen' | 'appStatus' | 'tabRePress' | 'isInternetConnected';

export const AppStatus = {
  Initializing: 'initializing',
  InternetConnectionRequired: 'internet_connection_required',
  RequiredAppUpdate: 'required_app_update',
  ConfigLoading: 'config_loading',
  ConfigError: 'config_error',
  EasUpdateChecking: 'eas_update_checking',
  EasUpdateDownloading: 'eas_update_downloading',
  EasUpdateDownloadError: 'eas_update_download_error',
  EasUpdateInstalling: 'eas_update_installing',
  PermissionChecking: 'permission_checking',
  AuthLoading: 'auth_loading',
  AuthLoadError: 'auth_load_error',
  Initialized: 'initialized',
  AppSplashHiding: 'app_splash_hiding',
  Main: 'main',
} as const;
export type AppStatus = ValueOf<typeof AppStatus>;

export type AppListenerValue<Name extends AppListenerName> = Name extends 'lockScreen'
  ? boolean
  : Name extends 'appStatus'
  ? AppStatus
  : Name extends 'tabRepress'
  ? keyof MainTabScreenList
  : Name extends 'isInternetConnected'
  ? boolean
  : never;

export type AppListenerAppStatusCallback = (appStatus: AppStatus) => void;
export type AppListenerLockScreenCallback = (lockScreen: boolean) => void;
export type AppListenerTabRePressCallback = (name: keyof MainTabScreenList) => void;
export type AppListenerIsInternetConnectedCallback = (isInternetConnected: boolean) => void;

export interface AppListeners {
  appStatus: AppListenerAppStatusCallback[];
  lockScreen: AppListenerLockScreenCallback[];
  tabRePress: AppListenerTabRePressCallback[];
  isInternetConnected: AppListenerIsInternetConnectedCallback[];
}
