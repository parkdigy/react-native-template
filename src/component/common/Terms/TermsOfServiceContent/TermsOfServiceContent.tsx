import WebView from 'react-native-webview';
import {ApiErrorBackAlert} from '../../BackAlert/ApiErrorBackAlert';
import {type TermsOfServiceContentProps as Props} from './TermsOfServiceContent.types';

export const TermsOfServiceContent = ({}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View flex={1} backgroundColor={theme.colors.background}>
      {isError ? (
        <ApiErrorBackAlert
          text={'이용약관 내용을 불러올 수 없습니다.\n인터넷 연결 상태를 확인해주세요.'}
          onRetryPress={() => {
            setIsLoad(false);
            setIsError(false);
          }}
        />
      ) : (
        <WebView
          // source={{uri: ''}}
          source={{html: '<h1>이용약관 URL을 지정하세요.</h1>'}}
          style={{backgroundColor: theme.colors.background, opacity: isLoad && !isError ? 1 : 0.001}}
          onLoadEnd={() => setIsLoad(true)}
          onError={() => setIsError(true)}
        />
      )}

      {!isLoad && (
        <View position='absolute' left={0} top={0} right={0} bottom={0}>
          <View flex={1} alignItems='center' justifyContent='center'>
            <ActivityIndicator />
          </View>
        </View>
      )}
    </View>
  );
};

export default TermsOfServiceContent;
