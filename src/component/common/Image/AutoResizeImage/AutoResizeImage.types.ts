import {ImageProps, ImageStyle} from 'react-native';

export interface AutoResizeImageProps extends Omit<ImageProps, 'source' | 'style'> {
  uri: string;
  style?: Omit<ImageStyle, 'width' | 'height'>;
  width?: number;
  height?: number;
  maxWidth?: number;
}
