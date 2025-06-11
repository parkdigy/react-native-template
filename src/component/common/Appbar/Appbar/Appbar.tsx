/********************************************************************************************************************
 * 앱 바 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {Appbar as PaperAppbar} from 'react-native-paper';
import {hasNotch} from 'react-native-device-info';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Text_Default} from '../../Text';
import BlurView from '../../View/BlurView';
import {AppbarProps as Props, AppbarCommands, AppbarProps} from './Appbar.types';
import {useAppState} from '@context';
import {LayoutChangeEvent} from 'react-native';

const TITLE_PROPS: Omit<TextProps, 'children'> = {fontSize: isTablet ? px.s16 : px.s18, bold: true};

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
    const navigation: StackNavigationProp<any> = useNavigation();

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [blur, setBlur] = useState(initBlur);
    const [leftWidth, setLeftWidth] = useState(0);
    const [rightWidth, setRightWidth] = useState(0);

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

    const contentPaddingHorizontal = useMemo(() => Math.max(leftWidth, rightWidth), [leftWidth, rightWidth]);

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleToggleColorSchemePress = useCallback(() => {
      setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }, [colorScheme, setColorScheme]);

    const handleLeftLayout = useCallback((e: LayoutChangeEvent) => {
      setLeftWidth(e.nativeEvent.layout.width);
    }, []);

    const handleRightLayout = useCallback((e: LayoutChangeEvent) => {
      setRightWidth(e.nativeEvent.layout.width);
    }, []);

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
      () => [
        {backgroundColor: theme.colors.background},
        containerStyle,
        {paddingTop: isTablet && !hasNotch() ? 10 : 0},
      ],
      [containerStyle, theme.colors.background],
    );

    const titleProps: Omit<TextProps, 'children'> = useMemo(
      () => ({...TITLE_PROPS, color: theme.colors.textAccent}),
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

    const BackIcon = useCallback((iconProps: any) => <Icon name='chevron-back-outline' {...iconProps} />, []);

    const ToggleColorSchemeIcon = useCallback((iconProps: any) => <Icon name='invert-mode' {...iconProps} />, []);

    return (
      <Animated.View style={finalContainerStyle}>
        <Container {...ContainerProps}>
          <ContainerAppbar mode='small' elevated={false} style={finalContainerAppbarStyle} {...props}>
            <Stack row onLayout={handleLeftLayout} position='absolute' left={0} marginLeft={5}>
              {onBack && (type === 'default' || type === 'safe-area') && (
                <PaperAppbar.Action
                  icon={BackIcon}
                  style={{opacity: disabled ? 0.3 : 1, marginHorizontal: 0}}
                  accessibilityLabel='뒤로가기'
                  disabled={disabled}
                  color={theme.colors.textAccent}
                  onPress={() => navigation.goBack()}
                />
              )}
            </Stack>
            {typeof title === 'string' ? (
              <PaperAppbar.Content
                disabled={disabled}
                style={{
                  paddingVertical: 10,
                  marginVertical: -10,
                  pointerEvents: 'none',
                  paddingHorizontal: contentPaddingHorizontal,
                }}
                title={
                  <View alignItems='center'>
                    <Text_Default {...titleProps} numberOfLines={1}>
                      {title}
                    </Text_Default>
                  </View>
                }
              />
            ) : (
              <PaperAppbar.Content disabled={disabled} title={title} onPress={() => navigation.goBack()} />
            )}
            <Stack row onLayout={handleRightLayout} position='absolute' right={0} marginRight={5}>
              {__DEV__ && (
                <PaperAppbar.Action
                  icon={ToggleColorSchemeIcon}
                  style={{opacity: disabled ? 0.3 : 1, marginHorizontal: 0}}
                  color={theme.colors.textAccent}
                  accessibilityLabel='테마변경'
                  onPress={disabled ? undefined : handleToggleColorSchemePress}
                />
              )}
              {children}
              {/*{(type === 'modal' || type === 'fullscreen-modal') && onClose && (*/}
              <PaperAppbar.Action
                icon='close'
                color={theme.colors.textAccent}
                accessibilityLabel='닫기'
                style={{opacity: disabled ? 0.3 : 1, marginHorizontal: 0}}
                onPress={disabled ? undefined : onClose}
              />
              {/*)}*/}
            </Stack>
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
