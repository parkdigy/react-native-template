import {Grayscale} from 'react-native-color-matrix-image-filters';
import {type GrayscaleImageProps as Props} from './GrayscaleImage.types';

export const GrayscaleImage = ({amount, children, ...props}: Props) => {
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
