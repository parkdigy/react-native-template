import React from 'react';
import {StyleSheet} from 'react-native';
import {LineProps as Props} from './Line.types';

const Line: React.FC<Props> = ({height, color, ...props}) => {
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

Line.displayName = 'Line';

export default Line;
