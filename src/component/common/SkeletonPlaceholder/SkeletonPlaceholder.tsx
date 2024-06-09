import React from 'react';
import _SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SkeletonPlaceholderProps as Props} from './SkeletonPlaceholder.types';

const SkeletonPlaceholder = ({children, backgroundColor, speed, highlightColor, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [enabled, setEnabled] = useState(false);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 최초에 진한색이 표시되는 것을 방지하기 위해 50ms 후에 표시 */
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnabled(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View opacity={enabled ? 1 : 0}>
      <_SkeletonPlaceholder
        backgroundColor={ifUndefined(backgroundColor, theme.colors.opacity25)}
        highlightColor={ifUndefined(highlightColor, theme.colors.background)}
        speed={ifUndefined(speed, 500)}
        borderRadius={10}
        {...props}>
        {children}
      </_SkeletonPlaceholder>
    </View>
  );
};

SkeletonPlaceholder.Item = _SkeletonPlaceholder.Item;

export default SkeletonPlaceholder;
