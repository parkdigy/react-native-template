/********************************************************************************************************************
 * API 오류 재시도 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ApiErrorBackAlertProps as Props} from './ApiErrorBackAlert.types';

const ApiErrorBackAlert = ({text: initText, noIcon, ...props}: Props) => {
  return (
    <BackAlert
      icon={noIcon ? undefined : 'error'}
      text={ifUndefined(initText, text.DATA_LOAD_FAIL_RETRY)}
      retryButtonText='재시도'
      {...props}
    />
  );
};

export default ApiErrorBackAlert;
