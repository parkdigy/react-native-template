import React from 'react';
import {SvgProps} from 'react-native-svg';

export interface SvgImageProps extends Omit<SvgProps, 'width' | 'height'> {
  source: React.FC<SvgProps>;
  width: number;
  height: number;
  autoTabletSize?: boolean;
}
