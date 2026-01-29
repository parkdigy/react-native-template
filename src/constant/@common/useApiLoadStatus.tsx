export type ApiLoadStatus = 'none' | 'loading' | 'success' | 'error';

export const useApiLoadStatus = (initStatus: ApiLoadStatus = 'none') => {
  const [status, setStatus] = useState<ApiLoadStatus>(initStatus);
  const [error, setError] = useState<string>();

  const setApiLoadStart = useCallback(() => {
    setStatus('loading');
    setError(undefined);
  }, []);

  const setApiLoadSuccess = useCallback(() => {
    setStatus('success');
  }, []);

  const setApiLoadError = useCallback((err: any, defaultErrorMsg = '정보 불러올 수 없습니다.') => {
    setStatus('error');
    if (typeof err === 'string') {
      setError(err);
    } else {
      setError(api.error.getResultMessage(err) || defaultErrorMsg);
    }
    // setError(message);
  }, []);

  return useMemo(
    () => ({
      apiLoadStatus: status,
      apiLoadError: error,
      setApiLoadStart,
      setApiLoadSuccess,
      setApiLoadError,
    }),
    [error, setApiLoadError, setApiLoadStart, setApiLoadSuccess, status],
  );
};

export default useApiLoadStatus;
