export const AdvertisingStatus = {
  NotDetermined: 0, // 사용자에게 권한 승인이 요청되지 않은 상태
  Restricted: 1, // 사용자가 시스템 설정에서 권한을 거부한 상태
  Denied: 2, // 사용자가 권한을 거부한 상태
  Authorized: 3, // 사용자가 권한을 승인한 상태
} as const;
export type AdvertisingStatus = ValueOf<typeof AdvertisingStatus>;

export interface TNativeModules {
  RNUtilModule: {
    /** ios */
    getAdvertisingStatus(): Promise<AdvertisingStatus>;
    /** android */
    getAccounts(choose?: boolean): Promise<string>;
    isAppInstalled(packageId: string): Promise<boolean>;
    appRun(packageId: string): Promise<boolean>;
    /** ios and android */
    getAdvertisingInfo(): Promise<{id: string | null; isAdTrackingLimited: boolean}>;
  };
}
