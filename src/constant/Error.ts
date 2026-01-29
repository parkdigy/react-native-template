/********************************************************************************************************************
 * API 오류 코드
 * ******************************************************************************************************************/

export const Error = {
  auth: {
    signIn: {
      invalidSnsToken: 1000,
      notExistsEmail: 1001,
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

/********************************************************************************************************************
 * all values
 * ******************************************************************************************************************/
function getAllValues(obj: object, result = []) {
  for (const key of Object.keys(obj)) {
    const value = obj[key as keyof typeof obj];

    if (typeof value === 'object') {
      getAllValues(value, result);
    } else {
      if (!result.includes(value)) {
        result.push(value);
      }
    }
  }
  return result;
}

const allValues = getAllValues(Error);

/********************************************************************************************************************
 * export
 * ******************************************************************************************************************/

export default {...Error, allValues};
