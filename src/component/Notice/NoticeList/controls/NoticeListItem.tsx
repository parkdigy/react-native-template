/********************************************************************************************************************
 * 공지사항 목록 아이템 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {NoticeListDataItem} from '@const';
import {Text_Accent_W600} from '@style';

interface Props {
  theme: ReactNativePaperTheme;
  info: NoticeListDataItem;
  onPress?(): void;
}

const NoticeListItem = ({theme, info, onPress}: Props) => {
  return (
    <TouchableOpacity pv={20} onPress={onPress}>
      <Stack row center>
        <Stack flex={1} pr={16}>
          <Text_Accent_W600 lineHeight={18} numberOfLines={1}>
            {info.title}
          </Text_Accent_W600>
          <DateText fontSize={13} color='right100' lineHeight={16} value={info.notice_date} mt={6} />
        </Stack>
        <View mr={-5}>
          <Icon name='chevron-right' size={20} color={theme.colors.textRight100} />
        </View>
      </Stack>
    </TouchableOpacity>
  );
};

export default NoticeListItem;
