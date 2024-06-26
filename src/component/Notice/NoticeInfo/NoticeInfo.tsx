/********************************************************************************************************************
 * '더보기 > 공지사항 > 상세' 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {NoticeInfoData} from '@const';
import {Text_18_Accent_W600} from '@style';
import {NoticeInfoProps as Props} from './NoticeInfo.types';

const NoticeInfo = ({
  route: {
    params: {
      info: {id, title, notice_date},
    },
  },
}: Props) => {
  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleLoadInfo = useCallback(() => {
    return new Promise<NoticeInfoData>((resolve, reject) => {
      Const.Notice.info(id)
        .then(({data}) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, [id]);

  const handleRenderLoading = useCallback(
    () => (
      <ContainerView flex={1}>
        {(title || notice_date) && (
          <Stack spacing={24}>
            <Stack spacing={12}>
              {title && <Text_18_Accent_W600 lineHeight={24}>{title}</Text_18_Accent_W600>}
              {notice_date && <DateText fontSize={13} color='right100' lineHeight={16} value={notice_date} />}
            </Stack>
            <Divider />
          </Stack>
        )}
        <View flex={1} alignItems='center' justifyContent='center'>
          <ActivityIndicator />
        </View>
      </ContainerView>
    ),
    [notice_date, title],
  );

  const handleRenderInfo = useCallback((info: NoticeInfoData) => {
    return (
      <ContainerScrollView>
        <Stack spacing={24}>
          <Stack spacing={12}>
            <Text_18_Accent_W600 lineHeight={24}>{info.title}</Text_18_Accent_W600>
            <DateText fontSize={13} color='right100' lineHeight={16} value={info.notice_date} />
          </Stack>
          <Divider />
          <AutoHeightWebView source={{html: info.content}} />
        </Stack>
      </ContainerScrollView>
    );
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ApiInfoView onLoadInfo={handleLoadInfo} renderLoading={handleRenderLoading} renderInfo={handleRenderInfo} />;
};

export default NoticeInfo;
