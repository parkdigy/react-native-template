import React from 'react';
import {Image, unstable_batchedUpdates} from 'react-native';
import {SvgUri} from 'react-native-svg';
import axios from 'axios';
import storage from '@storage';
import {API_AUTH_COOKIE_NAME} from '@api';
import {AutoResizeImageProps as Props} from './AutoResizeImage.types';

const AutoResizeImage: React.FC<Props> = ({uri, style, width, height, maxWidth, ...props}) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [imageUri, setImageUri] = useState<string>();
  const [imageSize, setImageSize] = useState<{width: number; height: number}>();
  const [size, setSize] = useState<{width: number; height: number}>();
  const [isSvg, setIsSvg] = useState(false);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const isInnerUrl = useMemo(() => uri.startsWith('/'), [uri]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (isInnerUrl) {
      storage.getAuth().then((authData) => {
        axios
          .get(`${app.getApiBaseUrl()}${uri}`, {
            responseType: 'blob',
            headers: {Cookie: `${API_AUTH_COOKIE_NAME}=${ifNullOrUndefined(authData?.authKey, '')};`},
          })
          .then((res) => {
            const contentType = res.headers['content-type'];

            if (contentType) {
              const fileReader = new FileReader();
              fileReader.onload = (e) => {
                const newImageUri = e.target?.result as string;
                Image.getSize(newImageUri, (w, h) => {
                  unstable_batchedUpdates(() => {
                    setImageUri(newImageUri);
                    setImageSize({width: w, height: h});
                  });
                });
              };
              fileReader.readAsDataURL(new Blob([res.data], {type: contentType, lastModified: 0}));
            }
          });
      });
    } else {
      const newImageUri = uri;
      axios.head(newImageUri, {responseType: 'blob'}).then((res) => {
        const contentType = res.headers['content-type'];
        const newIsSvg = !!contentType && contentType.startsWith('image/svg');
        if (newIsSvg) {
          unstable_batchedUpdates(() => {
            setIsSvg(newIsSvg);
            setImageUri(newImageUri);
          });
        } else {
          Image.getSize(newImageUri, (w, h) => {
            unstable_batchedUpdates(() => {
              setIsSvg(newIsSvg);
              setImageUri(newImageUri);
              setImageSize({width: w, height: h});
            });
          });
        }
      });
    }
  }, [uri, isInnerUrl]);

  useEffect(() => {
    if (imageSize == null) {
      return;
    }

    if (width == null && height == null) {
      let scale = 1;
      if (maxWidth != null && imageSize.width > maxWidth) {
        scale = maxWidth / imageSize.width;
      }
      setSize({width: imageSize.width * scale, height: imageSize.height * scale});
    } else if (width != null && height == null) {
      const scale = imageSize.width === 0 ? 1 : width / imageSize.width;
      setSize({width: imageSize.width * scale, height: imageSize.height * scale});
    } else if (height != null && width == null) {
      const scale = imageSize.height === 0 ? 1 : height / imageSize.height;
      setSize({width: imageSize.width * scale, height: imageSize.height * scale});
    } else if (width != null && height != null) {
      setSize({width, height});
    }
  }, [width, height, imageSize, maxWidth]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalStyle = useMemo(() => ({...style, width: size?.width, height: size?.height}), [style, size]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return imageUri ? (
    <>
      {isSvg ? (
        <SvgUri uri={imageUri} width={size?.width} height={size?.height} style={style} />
      ) : (
        <Image
          source={{uri: imageUri}}
          {...props}
          style={finalStyle}
          onLoad={(e) => setImageSize({width: e.nativeEvent.source.width, height: e.nativeEvent.source.height})}
        />
      )}
    </>
  ) : null;
};

AutoResizeImage.displayName = 'AutoResizeImage';

export default AutoResizeImage;
