import {ImageProps} from 'react-native';

export interface PngImageProps extends Omit<ImageProps, 'width' | 'height'> {
  width?: number;
  height?: number;
  autoTabletSize?: boolean;
}
