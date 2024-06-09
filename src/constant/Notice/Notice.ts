/********************************************************************************************************************
 * 공지사항 API
 * ******************************************************************************************************************/

import api from '@api';
import {NoticeInfo, NoticeList} from './Notice.types';

export default {
  // 목록
  list(data: Dict) {
    return api.get<NoticeList>('notice', data);
  },
  // 정보
  info(id: number) {
    return api.get<NoticeInfo>(`notice.${id}`);
  },
};
