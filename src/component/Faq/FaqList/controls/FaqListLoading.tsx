/********************************************************************************************************************
 * FAQ 목록 로딩 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';

interface Props {
  height: number;
}

const FaqListLoading = ({height}: Props) => {
  return (
    <View animation='fadeIn' delay={100} height={height} justifyContent='center'>
      <ActivityIndicator />
    </View>
  );
};

export default FaqListLoading;
