/********************************************************************************************************************
 * MY API
 * ******************************************************************************************************************/

import api from '@api';

export default {
  // FCM 등록
  addFcm(data: Dict) {
    return api.post('my.fcm', data);
  },
  // 이름 변경
  editNickname(nickname: string) {
    return api.patch('my.nickname', {nickname});
  },
  editIsPushNotification(is_push_notification: boolean) {
    return api.patch('my.is_push_notification', {is_push_notification});
  },
  // 회원탈퇴
  resign(data: Dict) {
    return api.post('my.resign', data);
  },
};
