/********************************************************************************************************************
 * FAQ 목록 로딩 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';

const FaqListLoading = () => {
  return (
    <View>
      <SkeletonPlaceholder>
        <>
          {new Array(20).fill(0).map((v, idx) => (
            <React.Fragment key={idx}>
              <View height={1} marginTop={10} />
              <View style={{height: 34, marginVertical: 13}} />
            </React.Fragment>
          ))}
        </>
      </SkeletonPlaceholder>
    </View>
  );
};

export default FaqListLoading;
