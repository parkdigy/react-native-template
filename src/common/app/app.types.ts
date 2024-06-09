import {MainTabScreenList} from '@types';

export type AppListenerName = 'lockScreen' | 'appStatus' | 'tabRePress';

export const AppStatus = {
  Loading: 'loading',
  LoadError: 'load_error',
  RequiredAppUpdate: 'required_app_update',
  CodePushDownloading: 'code_push_downloading',
  CodePushInstalling: 'code_push_installing',
  CodePushChecked: 'code_push_checked',
  CodePushScreenHiding: 'code_push_screen_hiding',
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
