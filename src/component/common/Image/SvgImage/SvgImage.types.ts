import React from 'react';
import {type SvgProps} from 'react-native-svg';

export interface SvgImageProps extends Omit<SvgProps, 'width' | 'height'> {
  source: (props: SvgProps) => React.JSX.Element;
  width: number;
  height: number;
  autoTabletSize?: boolean;
}
