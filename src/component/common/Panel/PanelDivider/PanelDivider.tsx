import React from 'react';
import {StyleSheet} from 'react-native';
import {PanelDividerProps as Props} from './PanelDivider.types';

export const PanelDivider = ({borderTopWidth, borderTopColor, ...props}: Props) => {
  const theme = useTheme();

  return (
    <View
      {...props}
      borderTopWidth={ifUndefined(borderTopWidth, StyleSheet.hairlineWidth)}
      borderTopColor={ifUndefined(borderTopColor, theme.dark ? '#ffffff25' : '#bfbfbf')}
    />
  );
};

export default PanelDivider;
