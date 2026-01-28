/********************************************************************************************************************
 * 앱의 활성화 상태 변화를 감지하는 컴포넌트
 * ******************************************************************************************************************/

import {useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {type AppStateStatus} from 'react-native';
import {useAppState} from '@context';
import {type ActiveDetectorProps as Props} from './ActiveDetector.types';

const ActiveDetector = ({
  children,
  onChange,
  onChangeInForeground,
  onActiveFromBackground,
  onAppInactive,
  onAppActiveFromInactive,
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {appState} = useAppState();
  const activeScreen = useIsFocused();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const pastTimeRef = useRef<number>(0);
  const activeFromBackgroundTimeRef = useRef<number>(0);
  const appInactiveActiveTimeRef = useRef(0);
  const foregroundChangeSkipRef = useRef(false);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [lastAppState, setLastAppState] = useState<AppStateStatus>(appState);
  const [lastIsActive, setLastIsActive] = useState(appState !== 'background' && activeScreen);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const isActive = useMemo(() => appState === 'active' && activeScreen, [activeScreen, appState]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (appState !== 'active' && activeScreen) {
      foregroundChangeSkipRef.current = true;
    }
  }, [activeScreen, appState]);

  useEventEffect(() => {
    if (appState === 'active') {
      if (foregroundChangeSkipRef.current) {
        foregroundChangeSkipRef.current = false;
      } else {
        const pastTime = pastTimeRef.current === 0 ? 0 : nowTime() - pastTimeRef.current;
        onChangeInForeground?.(isActive, pastTime);
      }
    }
  }, [isActive]);

  useEventEffect(() => {
    if (lastAppState === 'background' && appState === 'active') {
      onActiveFromBackground &&
        onActiveFromBackground(
          activeFromBackgroundTimeRef.current === 0 ? 0 : nowTime() - activeFromBackgroundTimeRef.current,
        );
    } else if (lastAppState !== 'background' && appState === 'background') {
      activeFromBackgroundTimeRef.current = nowTime();
    }
    setLastAppState(appState);
  }, [appState, lastAppState]);

  useEventEffect(() => {
    if (lastAppState === 'active' && appState !== 'active') {
      appInactiveActiveTimeRef.current = nowTime();
      onAppInactive?.();
    }
  }, [appState, lastAppState]);

  useEventEffect(() => {
    if (lastAppState !== 'active' && appState === 'active') {
      onAppActiveFromInactive &&
        onAppActiveFromInactive(
          appInactiveActiveTimeRef.current === 0 ? 0 : nowTime() - appInactiveActiveTimeRef.current,
        );
    }
  }, [appState, lastAppState]);

  useEventEffect(() => {
    setLastIsActive(isActive);
    const pastTime = pastTimeRef.current === 0 ? 0 : nowTime() - pastTimeRef.current;
    onChange?.(isActive, pastTime, appState);
  }, [isActive]);

  useEffect(() => {
    if (lastIsActive !== isActive) {
      pastTimeRef.current = nowTime();
    }
  }, [isActive, lastIsActive]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <>{children}</>;
};

export default ActiveDetector;
