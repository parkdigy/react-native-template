import Error from '@/constant/Error';

const {allValues, ...Errors} = Error;
const error = {
  ...Errors,

  getAllValues: allValues,

  /** getResult */
  getResult(err: any): ApiResult['result'] | undefined {
    return err.response?.data?.result;
  },

  /** getResultCode */
  getResultCode(err: any): ApiResult['result']['c'] | undefined {
    return err.response?.data?.result?.c;
  },

  /** getResultMessage */
  getResultMessage(err: any): ApiResult['result']['m'] | undefined {
    const result = this.getResult(err);
    if (result) {
      return result.m;
    } else {
      return err.message;
    }
  },

  /** getResultError */
  getResultError(err: any): ApiResult['result']['e'] | undefined {
    return err.response?.data?.result?.e;
  },

  /** isApiError */
  isApiError(err: any) {
    const code = this.getResultCode(err);
    return code !== undefined && contains(Error.allValues, code);
  },
};

export default error;
