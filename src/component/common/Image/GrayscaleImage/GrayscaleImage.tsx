import React from 'react';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {GrayscaleImageProps as Props} from './GrayscaleImage.types';

export const GrayscaleImage: React.FC<Props> = ({amount, children, ...props}) => {
  return isIos && isEmulator && Platform.Version === '17.4' ? (
    <View {...props}>{children}</View>
  ) : (
    <Grayscale amount={amount} {...props}>
      {children}
    </Grayscale>
  );
};

export type TGrayscaleImage = typeof GrayscaleImage;

export default GrayscaleImage;
