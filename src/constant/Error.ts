/********************************************************************************************************************
 * API 오류 코드
 * ******************************************************************************************************************/

export const Error = {
  auth: {
    signIn: {
      invalidSnsToken: 1002,
    },
  },
  my: {
    editEmail: {
      usingEmail: 1000,
      sameEmail: 1001,
      invalidAuthNum: 1002,
      timeLimitAuthNum: 1003,
      failLimitAuthNum: 1004,
    },
    resign: {
      alreadyResign: 1000,
    },
  },
};

export default Error;
