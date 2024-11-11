import {ApiResult} from '@api';

/********************************************************************************************************************
 * 설정 정보
 * ******************************************************************************************************************/

export interface ConfigInfoData {
  auth_cookie_name: string;
  app_version: string;
  app_build_number: number;
  app_required_build_number: number;
  market_url: string;
}

export interface ConfigInfo extends ApiResult {
  data: ConfigInfoData;
}
