/********************************************************************************************************************
 * 앱 바 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Appbar as PaperAppbar} from 'react-native-paper';
import {useAppState} from '@context';
import BlurView from '../../View/BlurView';
import {AppbarProps as Props, AppbarCommands, AppbarProps} from './Appbar.types';

const TITLE_STYLE: StyleProp<TextStyle> = {fontSize: 16, fontWeight: '700'};

const Appbar = React.forwardRef<AppbarCommands, Props>(
  (
    {
      title,
      blur: initBlur,
      type = 'default',
      height = 38,
      modalHeight = 60,
      style,
      containerStyle,
      subContent,
      disabled,
      children,
      onBack,
      onClose,
      ...props
    },
    ref,
  ) => {
    /********************************************************************************************************************
     * Use
     * ******************************************************************************************************************/

    const theme = useTheme();
    const {colorScheme, setColorScheme} = useAppState();

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

    const commands = useMemo((): AppbarCommands => {
      return {
        setBlur(value: boolean) {
          setBlur(value);
        },
      };
    }, []);

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(commands);
        } else {
          ref.current = commands;
        }
      }
      return () => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(null);
          } else {
            ref.current = null;
          }
        }
      };
    }, [ref, commands]);

    /********************************************************************************************************************
     * Memo
     * ******************************************************************************************************************/

    const containerMyAppBarStyle = useMemo(
      () => [{height: type === 'modal' ? modalHeight : height}, style],
      [type, height, modalHeight, style],
    );

    const finalBlur = useMemo(() => isIos && blur, [blur]);

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleToggleColorSchemePress = useCallback(() => {
      setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }, [colorScheme, setColorScheme]);

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    const ContainerAppbar = useMemo(
      () => (type === 'modal' || type === 'safe-area' ? PaperAppbar : PaperAppbar.Header),
      [type],
    );

    const Container = useMemo(() => (finalBlur ? BlurView : View), [finalBlur]);

    const ContainerProps = useMemo(
      () => (finalBlur ? undefined : {style: {backgroundColor: theme.colors.background}}),
      [theme, finalBlur],
    );

    const finalContainerStyle: Props['containerStyle'] = useMemo(
      () => [{backgroundColor: theme.colors.background}, containerStyle],
      [containerStyle, theme.colors.background],
    );

    const titleStyle: StyleProp<TextStyle> = useMemo(
      () => ({...TITLE_STYLE, color: theme.colors.textAccent}),
      [theme.colors.textAccent],
    );

    const finalContainerAppbarStyle: AppbarProps['style'] = useMemo(
      () => [
        containerMyAppBarStyle,
        {
          backgroundColor: finalBlur ? 'transparent' : theme.colors.background,
        },
      ],
      [containerMyAppBarStyle, finalBlur, theme.colors.background],
    );

    return (
      <Animated.View style={finalContainerStyle}>
        <Container {...ContainerProps}>
          <ContainerAppbar mode='small' elevated={false} style={finalContainerAppbarStyle} {...props}>
            {onBack && (type === 'default' || type === 'safe-area') && (
              <PaperAppbar.BackAction
                size={16}
                style={{opacity: disabled ? 0.3 : 1}}
                onPress={disabled ? undefined : onBack}
              />
            )}
            {typeof title === 'string' ? (
              <PaperAppbar.Content disabled={disabled} title={title} titleStyle={titleStyle} />
            ) : (
              <PaperAppbar.Content disabled={disabled} title={title} />
            )}
            {__DEV__ && (
              <PaperAppbar.Action
                icon='compare'
                size={20}
                style={{opacity: disabled ? 0.3 : 1}}
                color={theme.colors.textAccent}
                onPress={disabled ? undefined : handleToggleColorSchemePress}
              />
            )}
            {children}
            {(type === 'modal' || type === 'fullscreen-modal') && onClose && (
              <PaperAppbar.Action
                icon='close'
                color={theme.colors.textAccent}
                size={20}
                style={{opacity: disabled ? 0.3 : 1}}
                onPress={disabled ? undefined : onClose}
              />
            )}
          </ContainerAppbar>
          {subContent}
        </Container>
      </Animated.View>
    );
  },
);

const WithStaticAppbar = withStaticProps(Appbar, {
  Action: PaperAppbar.Action,
  BackAction: PaperAppbar.BackAction,
  Content: PaperAppbar.Content,
});

export default WithStaticAppbar;
