/********************************************************************************************************************
 * 공지사항 목록 로딩 컴포넌트
 * ******************************************************************************************************************/

interface Props {
  height: number;
}

const NoticeListLoading = ({height}: Props) => {
  return (
    <View animation={'fadeIn'} delay={100} height={height} justifyContent='center'>
      <ActivityIndicator />
    </View>
  );
};

export default NoticeListLoading;
