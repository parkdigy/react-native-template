import {Image} from 'react-native';
import {type PngImageProps as Props} from './PngImage.types';

const PngImage = ({style, width, height, autoTabletSize, resizeMode, ...props}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalStyle = useMemo<Props['style']>(
    () => [
      {
        width: autoTabletSize && notEmpty(width) ? width * tabletSizeFactor : width,
        height: autoTabletSize && notEmpty(height) ? height * tabletSizeFactor : height,
        resizeMode: ifUndefined(resizeMode, 'contain'),
      },
      style,
    ],
    [autoTabletSize, height, resizeMode, style, width],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <Image style={finalStyle} {...props} />;
};

export default PngImage;
