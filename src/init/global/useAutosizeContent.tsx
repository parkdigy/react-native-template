import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';

interface Info {
  baseWidth: number;
  baseHeight: number;
  margin: number;
  maxWidth?: number;
}

declare global {
  function useAutosizeContent(info: Info): {width: number; height: number};
}

function useAutosizeContentProc(info: Info): {width: number; height: number} {
  const safeAreaInsets = useSafeAreaInsets();
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  return useMemo(() => {
    const maxWidth = Math.min(
      windowWidth - info.margin * 2 - safeAreaInsets.left - safeAreaInsets.right,
      ifUndefined(info.maxWidth, windowWidth),
    );
    const maxHeight = windowHeight - info.margin * 2 - safeAreaInsets.top - safeAreaInsets.bottom;

    let width = maxWidth;
    let height = (width / info.baseWidth) * info.baseHeight;

    if (height > maxHeight) {
      height = maxHeight;
      width = (height / info.baseHeight) * info.baseWidth;
    }

    return {width, height};
  }, [
    info.baseHeight,
    info.baseWidth,
    info.margin,
    info.maxWidth,
    safeAreaInsets.bottom,
    safeAreaInsets.left,
    safeAreaInsets.right,
    safeAreaInsets.top,
    windowHeight,
    windowWidth,
  ]);
}

global.useAutosizeContent = useAutosizeContentProc;
