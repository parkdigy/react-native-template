import NativePermission from 'react-native-permissions';
import {Permission, PermissionStatus} from '@types';
import {AppStatus} from '@app';

interface Props {
  appStatus: AppStatus;
  onResult(permissionMap: {[key in Permission]: PermissionStatus}): void;
}

export const AppInitializer_Permission = ({appStatus, onResult}: Props) => {
  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const check = useCallback(() => {
    const permissionMap: Dict<PermissionStatus> = {};

    const checkPermissions: Permission[] = Object.values(Permission);
    if (checkPermissions.length > 0) {
      let checkedCount = 0;
      checkPermissions.forEach((permission) => {
        NativePermission.check(permission).then((status) => {
          permissionMap[permission] = status;
          checkedCount += 1;
          if (checkedCount === checkPermissions.length) {
            onResult(permissionMap as any);
            app.nextAppStatus(app.AppStatus.PermissionChecking);
          }
        });
      });
    } else {
      onResult(permissionMap as any);
      app.nextAppStatus(app.AppStatus.PermissionChecking);
    }
  }, [onResult]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEventEffect(() => {
    if (appStatus === app.AppStatus.PermissionChecking) {
      check();
    }
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return null;
};
