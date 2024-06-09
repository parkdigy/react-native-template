/********************************************************************************************************************
 * 공통 API
 * ******************************************************************************************************************/

import api from '@api';
import {ConfigInfo} from '@const';

export default {
  // 설정 정보
  configInfo() {
    return api.get<ConfigInfo>('common.config');
  },
  // FCM 삭제
  removeFcm(token: string) {
    return api.delete('common.fcm', {token});
  },
};
