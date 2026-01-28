/********************************************************************************************************************
 * 해더 앱 바 컴포넌트
 * ******************************************************************************************************************/

import {getHeaderTitle} from '@react-navigation/elements';
import {useAppListener} from '@app';
import Appbar, {type AppbarCommands, type AppbarProps} from '../Appbar';
import {type HeaderAppbarProps as Props} from './HeaderAppbar.types';

const HeaderAppbar = ({
  ref,
  back,
  navigation,
  options,
  height = 38,
  disabled,
  modalHeight = 60,
  children,
  blur: initBlur,
  ...props
}: Props) => {
  const lockScreen = useAppListener('lockScreen');

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [blur, setBlur] = useState(initBlur);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    setBlur(initBlur);
  }, [initBlur]);

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  useForwardRef(
    ref,
    useMemo<AppbarCommands>(() => {
      return {
        setBlur(value: boolean) {
          setBlur(value);
        },
      };
    }, []),
  );

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const title = useMemo(() => getHeaderTitle(options, ''), [options]);
  const type = useMemo<AppbarProps['type']>(() => {
    switch (options.presentation) {
      case 'modal':
      case 'formSheet':
      case 'pageSheet':
        return 'modal';
      case 'fullScreenModal':
      case 'transparentModal':
      case 'containedModal':
      case 'containedTransparentModal':
        return 'fullscreen-modal';
      default:
        return 'default';
    }
  }, [options]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Appbar
      key='HeaderAppbar'
      title={title}
      type={type}
      height={height}
      modalHeight={modalHeight}
      blur={blur}
      disabled={lockScreen || disabled}
      {...props}
      onBack={back ? navigation.goBack : undefined}
      onClose={navigation.goBack}>
      {children}
    </Appbar>
  );
};

export default withStaticProps(HeaderAppbar, {
  Action: Appbar.Action,
  BackAction: Appbar.BackAction,
  Content: Appbar.Content,
});
