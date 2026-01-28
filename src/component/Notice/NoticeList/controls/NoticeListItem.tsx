/********************************************************************************************************************
 * 공지사항 목록 아이템 컴포넌트
 * ******************************************************************************************************************/

import {type NoticeListDataItem} from '@const';

interface Props {
  info: NoticeListDataItem;
  onPress?(): void;
}

const NoticeListItem = ({info, onPress}: Props) => {
  return (
    <TouchableOpacity pv={20} onPress={onPress}>
      <Stack row center>
        <Stack flex={1} pr={16}>
          <TAccent bold lh={18} numberOfLines={1}>
            {info.title}
          </TAccent>
          <DateText fontSize={13} color='right100' lineHeight={16} value={info.notice_date} mt={6} />
        </Stack>
        <View mr={-5}>
          <Icon name='chevron-forward-outline' size={20} color='right100' />
        </View>
      </Stack>
    </TouchableOpacity>
  );
};

export default NoticeListItem;
