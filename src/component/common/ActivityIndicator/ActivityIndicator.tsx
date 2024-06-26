/********************************************************************************************************************
 * 로딩 Indicator 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ActivityIndicator as PaperActivityIndicator} from 'react-native-paper';
import {ActivityIndicatorProps as Props} from './ActivityIndicator.types';

const ActivityIndicator = (props: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <PaperActivityIndicator color={theme.colors.textAccent} animating={true} {...props} />;
};

export default ActivityIndicator;
