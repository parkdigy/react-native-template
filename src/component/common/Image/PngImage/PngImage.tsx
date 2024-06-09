import React from 'react';
import {Image} from 'react-native';
import {PngImageProps as Props} from './PngImage.types';

const PngImage = ({style, width, height, resizeMode, ...props}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalStyle = useMemo<Props['style']>(
    () => [{width, height, resizeMode: ifUndefined(resizeMode, 'contain')}, style],
    [height, resizeMode, style, width],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <Image style={finalStyle} {...props} />;
};

export default PngImage;
