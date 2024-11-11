import React from 'react';
import {SvgImageProps as Props} from './SvgImage.types';

export const SvgImage = ({source: Img, width, height, autoTabletSize, ...props}: Props) => {
  return (
    <Img
      width={autoTabletSize ? width * tabletSizeFactor : width}
      height={autoTabletSize ? height * tabletSizeFactor : height}
      {...props}
    />
  );
};

export default SvgImage;
