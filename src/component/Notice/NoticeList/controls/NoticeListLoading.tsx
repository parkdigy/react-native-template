/********************************************************************************************************************
 * 공지사항 목록 로딩 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';

const NoticeListLoading = () => {
  return (
    <SkeletonPlaceholder>
      <>
        {new Array(20).fill(0).map((v, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <View height={1} marginTop={10} />}
            <View style={{height: 40, marginVertical: 20}} />
          </React.Fragment>
        ))}
      </>
    </SkeletonPlaceholder>
  );
};

export default NoticeListLoading;
