import React from 'react';
import {LoadingProps as Props} from './Loading.types';

const Loading = ({}: Props) => {
  return (
    <View flex={1} alignItems='center' justifyContent='center'>
      <ActivityIndicator />
    </View>
  );
};

export default Loading;
