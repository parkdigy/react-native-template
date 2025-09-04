import {RESULTS} from 'react-native-permissions';

export const Permission = {
  // Microphone:
  //   Platform.OS === 'ios' ? Permissions.PERMISSIONS.IOS.MICROPHONE : Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
} as const;
export type Permission = ValueOf<typeof Permission>;

export type PermissionMap = {[key in Permission]: PermissionStatus};

export const PermissionStatus = RESULTS;
export type PermissionStatus = ValueOf<typeof PermissionStatus>;
