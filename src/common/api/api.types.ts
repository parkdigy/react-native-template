export interface ApiResult {
  result: {
    c: number;
    m?: string; // msg
    hm?: string; // html msg
    e?: string; // additional error
    r?: string; // redirect
    ro?: boolean; // redirect - open new window
  };
}

export interface ApiPaging {
  paging: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ApiResultPaging extends ApiResult, ApiPaging {}

export interface ApiPageLimitRequestData {
  page?: number;
  limit?: number;
}
