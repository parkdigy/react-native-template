import React from 'react';
import {Linking, ViewStyle} from 'react-native';
import _AutoHeightWebView, {SizeUpdate} from 'react-native-autoheight-webview';
import {WebViewSourceHtml} from 'react-native-webview/lib/WebViewTypes';
import {AutoHeightWebViewProps as Props} from './AutoHeightWebView.types';

const customStyle = `
body { margin: 0; padding: 0; font-size: 16px; font-family: "Pretendard","Dotum",sans-serif; line-height: 1.5; }
p { margin: 0; }
img { max-width:100%; height: auto !important; border-radius: 4px; }
iframe { border: 0; }
* { font-size: 16px !important; }
`;

const viewportContent = 'width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no';

const AutoHeightWebView: React.FC<Props> = ({style, onSizeUpdated, ...props}) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState(0);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleSizeUpdated = useCallback(
    (size: SizeUpdate) => {
      setHeight(size.height);
      onSizeUpdated && onSizeUpdated(size);
    },
    [onSizeUpdated],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  const isHtml = !!props.source && !!(props.source as WebViewSourceHtml).html;

  return (
    <View height={height} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <_AutoHeightWebView
        style={{width, ...(style as ViewStyle)}}
        scalesPageToFit={false}
        scrollEnabled={false}
        customStyle={isHtml ? `${customStyle} body {color: ${theme.colors.onSurface}}` : undefined}
        viewportContent={viewportContent}
        onSizeUpdated={handleSizeUpdated}
        onShouldStartLoadWithRequest={(req) => {
          if (req.navigationType === 'other' || (!isHtml && req.navigationType === 'click')) {
            return req.url === 'about:blank' || req.url.startsWith('https://www.youtube.com/');
          } else if (req.navigationType === 'click') {
            Linking.openURL(req.url);
            return false;
          } else {
            return false;
          }
        }}
        {...props}
      />
    </View>
  );
};

AutoHeightWebView.displayName = 'AutoHeightWebView';

export default AutoHeightWebView;
