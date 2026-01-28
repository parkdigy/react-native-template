import {type AppAuthInfo} from '@context';

export const App_loadAuth = async ({isInternetConnected, auth}: {isInternetConnected: boolean; auth: AppAuthInfo}) => {
  return new Promise<AppAuthInfo | undefined>(async (resolve) => {
    if (isInternetConnected) {
      const goLoadInfo = (data?: {google_id_token?: string; apple_id_token?: string}) => {
        Const.Auth.info({is_login: true, ...data})
          .then(({data: serverAuthData}) => {
            if (serverAuthData.auth) {
              const serverAuthInfo = serverAuthData.auth;
              resolve(serverAuthInfo);
            } else {
              resolve(undefined);
            }
          })
          .catch(() => {
            resolve(undefined);
          });
      };

      if (contains(['GOOGLE', 'APPLE'], auth.reg_type)) {
        // 구글, 애플 로그인
        // Firebase 에서 idToken 을 가져옴
        try {
          const idToken = await firebase.auth.currentUser?.getIdToken();
          if (idToken) {
            if (auth.reg_type === 'GOOGLE') {
              goLoadInfo({google_id_token: idToken});
            } else if (auth.reg_type === 'APPLE') {
              goLoadInfo({apple_id_token: idToken});
            }
          } else {
            // idToken 가져오기 실패 시
            resolve(undefined);
          }
        } catch {
          resolve(undefined);
        }
      } else {
        // 일반, 카카오, 네이버 로그인
        goLoadInfo();
      }
    } else {
      resolve(undefined);
    }
  });
};
