import {StyleSheet} from 'react-native';
import {type LineProps as Props} from './Line.types';

const Line = ({height, color, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View
      borderTopWidth={height || StyleSheet.hairlineWidth}
      borderTopColor={color || theme.colors.elevation.level2}
      {...props}
    />
  );
};

export default Line;
