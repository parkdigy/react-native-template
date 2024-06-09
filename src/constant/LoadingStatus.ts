/********************************************************************************************************************
 * 로딩 상태
 * ******************************************************************************************************************/

const FirstLoading = 'fl';
type FirstLoading = typeof FirstLoading;
const FirstSuccess = 'fs';
type FirstSuccess = typeof FirstSuccess;
const FirstError = 'fe';
type FirstError = typeof FirstError;
const NextLoading = 'nl';
type NextLoading = typeof NextLoading;
const NextSuccess = 'ns';
type NextSuccess = typeof NextSuccess;
const NextError = 'ne';
type NextError = typeof NextError;
const RefreshLoading = 'rl';
type RefreshLoading = typeof RefreshLoading;
const RefreshSuccess = 'rs';
type RefreshSuccess = typeof RefreshSuccess;
const RefreshError = 're';
type RefreshError = typeof RefreshError;
const Complete = 'c';
type Complete = typeof Complete;
const Empty = 'e';
type Empty = typeof Empty;

const CLoadingStatus = {
  FirstLoading,
  FirstSuccess,
  FirstError,
  NextLoading,
  NextSuccess,
  NextError,
  RefreshLoading,
  RefreshSuccess,
  RefreshError,
  Complete,
  Empty,
} as const;

export type LoadingStatus = ValueOf<typeof CLoadingStatus>;

export const LoadingStatus = {
  ...CLoadingStatus,
  isLoading(loadingStatus: LoadingStatus): loadingStatus is FirstLoading | NextLoading | RefreshLoading {
    switch (loadingStatus) {
      case CLoadingStatus.FirstLoading:
      case CLoadingStatus.NextLoading:
      case CLoadingStatus.RefreshLoading:
        return true;
      default:
        return false;
    }
  },
  isFirstOrRefreshLoading(loadingStatus: LoadingStatus): loadingStatus is FirstLoading | RefreshLoading {
    switch (loadingStatus) {
      case CLoadingStatus.FirstLoading:
      case CLoadingStatus.RefreshLoading:
        return true;
      default:
        return false;
    }
  },
  isSuccess(loadingStatus: LoadingStatus): loadingStatus is FirstSuccess | NextSuccess | RefreshSuccess {
    switch (loadingStatus) {
      case CLoadingStatus.FirstSuccess:
      case CLoadingStatus.NextSuccess:
      case CLoadingStatus.RefreshSuccess:
      case CLoadingStatus.Complete:
        return true;
      default:
        return false;
    }
  },
  isError(loadingStatus: LoadingStatus): loadingStatus is FirstError | NextError | RefreshError {
    switch (loadingStatus) {
      case CLoadingStatus.FirstError:
      case CLoadingStatus.NextError:
      case CLoadingStatus.RefreshError:
        return true;
      default:
        return false;
    }
  },
  getError(loadingStatus: Extract<LoadingStatus, FirstLoading | NextLoading | RefreshLoading>) {
    switch (loadingStatus) {
      case CLoadingStatus.FirstLoading:
        return CLoadingStatus.FirstError;
      case CLoadingStatus.NextLoading:
        return CLoadingStatus.NextError;
      case CLoadingStatus.RefreshLoading:
        return CLoadingStatus.RefreshError;
    }
  },
  getSuccess(loadingStatus: Extract<LoadingStatus, FirstLoading | NextLoading | RefreshLoading>) {
    switch (loadingStatus) {
      case CLoadingStatus.FirstLoading:
        return CLoadingStatus.FirstSuccess;
      case CLoadingStatus.NextLoading:
        return CLoadingStatus.NextSuccess;
      case CLoadingStatus.RefreshLoading:
        return CLoadingStatus.RefreshSuccess;
    }
  },
};

export default LoadingStatus;
