/********************************************************************************************************************
 * API 정보 뷰 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ApiInfoViewProps as Props, ApiInfoViewCommands} from './ApiInfoView.types';
import {useForwardLayoutRef} from '@pdg/react-hook';

interface WithForwardRefType<T = any> extends React.FC<Props<T>> {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  <T>(props: Props<T> & React.RefAttributes<ApiInfoViewCommands>): ReturnType<React.FC<Props<T>>>;
}

const ApiInfoView: WithForwardRefType = React.forwardRef<ApiInfoViewCommands, Props>(
  (
    {firstLoadDelay = 500, loadDelay = 500, onLoadStart, onLoadEnd, onLoadInfo, renderInfo, renderLoading, renderError},
    ref,
  ) => {
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

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useEffect(() => {
      loadInfo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
     * Memo
     * ******************************************************************************************************************/

    const content = useMemo(
      () => (!loading && !error && info ? renderInfo(info) : null),
      [error, info, loading, renderInfo],
    );

    const loadingContent = useMemo(
      () =>
        loading && renderLoading ? (
          renderLoading()
        ) : (
          <View flex={1} alignItems='center' justifyContent='center'>
            <ActivityIndicator />
          </View>
        ),
      [loading, renderLoading],
    );

    const errorContent = useMemo(
      () =>
        error && renderError ? (
          renderError(() => loadInfo())
        ) : (
          <View flex={1} alignItems='center' justifyContent='center'>
            <ApiErrorBackAlert onRetryPress={() => loadInfo()} />
          </View>
        ),
      [error, loadInfo, renderError],
    );

    /********************************************************************************************************************
     * Commands
     * ******************************************************************************************************************/

    useForwardLayoutRef(
      ref,
      useMemo<ApiInfoViewCommands>(() => ({reload: () => loadInfo(true)}), [loadInfo]),
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return <>{loading ? loadingContent : error ? errorContent : content}</>;
  },
);

export default ApiInfoView;
