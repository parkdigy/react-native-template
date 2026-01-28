/********************************************************************************************************************
 * API 정보 뷰 컴포넌트
 * ******************************************************************************************************************/

import {type ApiInfoViewProps as Props, type ApiInfoViewCommands} from './ApiInfoView.types';

const ApiInfoView = ({
  ref,
  firstLoadDelay = 500,
  loadDelay = 500,
  onLoadStart,
  onLoadEnd,
  onLoadInfo,
  renderInfo,
  renderLoading,
  renderError,
}: Props) => {
  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const isFirstLoadRef = useRef(true);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState<any>();
  const [errorContent, setErrorContent] = useState<ReactNode>();
  const [loadingContent, setLoadingContent] = useState<ReactNode>();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const loadInfo = useCallback(
    (reload?: boolean) => {
      if (!reload) {
        setLoading(true);
      }
      setError(false);
      onLoadStart?.();

      delayTimeout(
        () => {
          onLoadInfo()
            .then((newInfo) => {
              if (isFirstLoadRef.current) {
                isFirstLoadRef.current = false;
              }
              setInfo(newInfo);
            })
            .catch(() => setError(true))
            .finally(() => {
              setLoading(false);
              onLoadEnd?.();
            });
        },
        reload ? 0 : isFirstLoadRef.current ? firstLoadDelay : loadDelay,
      );
    },
    [firstLoadDelay, loadDelay, onLoadEnd, onLoadInfo, onLoadStart],
  );

  /********************************************************************************************************************
   * Changed
   * ******************************************************************************************************************/

  useChanged(() => {
    if (error && renderError) {
      setErrorContent(renderError(() => loadInfo()));
    } else {
      setErrorContent(
        <View flex={1} alignItems='center' justifyContent='center'>
          <ApiErrorBackAlert onRetryPress={() => loadInfo()} />
        </View>,
      );
    }
  }, [error, renderError]);

  useChanged(() => {
    if (loading && renderLoading) {
      setLoadingContent(renderLoading());
    } else {
      setLoadingContent(
        <View flex={1} alignItems='center' justifyContent='center'>
          <ActivityIndicator />
        </View>,
      );
    }
  }, [loading, renderLoading]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEventEffect(() => {
    loadInfo();
  }, []);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const content = useMemo(
    () => (!loading && !error && info ? renderInfo(info) : null),
    [error, info, loading, renderInfo],
  );

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  useForwardRef(
    ref,
    useMemo<ApiInfoViewCommands>(() => ({reload: () => loadInfo(true)}), [loadInfo]),
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <>{loading ? loadingContent : error ? errorContent : content}</>;
};

export default ApiInfoView;
