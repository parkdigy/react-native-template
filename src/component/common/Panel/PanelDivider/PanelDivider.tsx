import React from 'react';
import {PanelDividerProps as Props} from './PanelDivider.types';

export const PanelDivider = ({height, backgroundColor, ...props}: Props) => {
  return <View {...props} height={ifUndefined(height, 1)} backgroundColor={ifUndefined(backgroundColor, '#323232')} />;
};

export default PanelDivider;
