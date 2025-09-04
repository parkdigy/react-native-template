import React from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import {Text_Default} from '../../Text';
import {FullScreenDialogProps as Props} from './FullScreenDialog.types';

const FullScreenDialog = ({
  children,
  type,
  position,
  keyboardAware,
  keyboardAwareScrollViewRef,
  keyboardAwareScrollViewProps,
  title,
  titleColor,
  titleBackgroundColor,
  fullWidth,
  fullHeight,
  fullMax,
  maxWidth,
  minWidth: initMinWidth,
  backgroundColor,
  animationType,
  backdropClose,
  hideCloseButton,
  disabledCloseButton,
  bottomView,
  buttons,
  horizontalButtons,
  statusBarStyle,
  contentAnimation,
  preventBackClose,
  onRequestClose,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {width: windowWidth} = useWindowDimensions();
  const safeAreaInsets = useSafeAreaInsets();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const oldIsLockScreenRef = useRef<boolean>(undefined);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [parentHeight, setParentHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);
  const [buttonsHeight, setButtonsHeight] = useState(0);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    return () => {
      if (oldIsLockScreenRef.current !== undefined) {
        app.setLockScreen(oldIsLockScreenRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (preventBackClose) {
      if (oldIsLockScreenRef.current === undefined) {
        oldIsLockScreenRef.current = app.getLockScreen();
      }

      app.setLockScreen(true);
    }
  }, [preventBackClose]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const containerViewStyle: ViewProps['style'] = useMemo(
    () => ({
      flex: 1,
      paddingTop: fullMax ? 0 : isIos && !hasNotch() ? safeAreaInsets.top + 15 : safeAreaInsets.top,
      paddingBottom: fullMax ? 0 : isIos && !hasNotch() ? safeAreaInsets.bottom + 15 : safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [fullMax, safeAreaInsets.bottom, safeAreaInsets.left, safeAreaInsets.right, safeAreaInsets.top],
  );

  const minWidth = useMemo(
    () => (initMinWidth === undefined ? Math.round(windowWidth / 2) : Math.min(initMinWidth, windowWidth - 32)),
    [initMinWidth, windowWidth],
  );

  const finalMinWidth = useMemo(
    () => (maxWidth === undefined ? minWidth : Math.min(Math.min(minWidth, maxWidth), windowWidth - 32)),
    [maxWidth, minWidth, windowWidth],
  );

  const finalMaxWidth = useMemo(
    () => (maxWidth === undefined ? undefined : Math.min(maxWidth, windowWidth - 32)),
    [maxWidth, windowWidth],
  );

  const contentMaxHeight = useMemo(
    () => parentHeight - titleHeight - buttonsHeight - (Platform.OS === 'ios' ? 0 : 15),
    [buttonsHeight, parentHeight, titleHeight],
  );

  const content = useMemo(() => {
    const closeButton = !hideCloseButton ? (
      <Button
        flex={1}
        color='secondary'
        disabled={disabledCloseButton}
        labelStyle={{paddingVertical: px.s5}}
        borderRadius={0}
        onPress={onRequestClose}>
        닫기
      </Button>
    ) : null;

    const finalButtons = notEmpty(buttons) ? (
      <>
        {Array.isArray(buttons) ? (
          buttons.map((button, idx) => (
            <Button
              key={idx}
              size='sm'
              flex={type === undefined || horizontalButtons ? 1 : undefined}
              color={button.color}
              disabled={button.disabled}
              loading={button.loading}
              labelStyle={{paddingVertical: type === undefined ? px.s5 : px.s3}}
              borderRadius={type === undefined ? 0 : undefined}
              onPress={button.onPress}>
              {button.label}
            </Button>
          ))
        ) : (
          <Button
            flex={type === undefined || horizontalButtons ? 1 : undefined}
            size='sm'
            color={buttons.color}
            disabled={buttons.disabled}
            loading={buttons.loading}
            labelStyle={{paddingVertical: type === undefined ? px.s5 : px.s3}}
            borderRadius={type === undefined ? 0 : undefined}
            onPress={buttons.onPress}>
            {buttons.label}
          </Button>
        )}
      </>
    ) : null;

    return (
      <View
        {...contentAnimation}
        flex={fullHeight ? 1 : undefined}
        alignItems='center'
        justifyContent='center'
        width={fullWidth ? '100%' : undefined}
        ph={fullWidth ? (fullMax ? 0 : px.s15) : undefined}
        pv={Platform.OS !== 'ios' ? (fullMax ? 0 : px.s15) : 0}>
        <View
          flex={fullHeight ? 1 : undefined}
          width='100%'
          maxWidth={finalMaxWidth}
          minWidth={finalMinWidth}
          backgroundColor={ifUndefined(backgroundColor, theme.colors.background)}
          overflow='hidden'
          borderRadius={fullMax ? 0 : 15}>
          <View flex={fullHeight ? 1 : undefined}>
            {title && (
              <View
                pv={px.s18}
                ph={px.s16}
                backgroundColor={ifUndefined(titleBackgroundColor, theme.colors.surface)}
                justifyContent='center'
                onLayout={(e) => setTitleHeight(e.nativeEvent.layout.height)}>
                {typeof title === 'string' ? (
                  <Text_Default s={16} color={ifUndefined(titleColor, theme.colors.textAccent)}>
                    {title}
                  </Text_Default>
                ) : (
                  title
                )}
              </View>
            )}

            <View
              maxHeight={fullHeight ? undefined : contentMaxHeight}
              flex={fullHeight ? 1 : undefined}
              overflow='hidden'>
              {children}
            </View>

            {(closeButton || finalButtons) && (
              <>
                {type === undefined ? (
                  <Stack row center mb={px.s_1} onLayout={(e) => setButtonsHeight(e.nativeEvent.layout.height)}>
                    {closeButton}
                    {finalButtons}
                  </Stack>
                ) : (
                  <Stack
                    row={horizontalButtons}
                    center={horizontalButtons}
                    fullWidth={horizontalButtons}
                    spacing={px.s10}
                    onLayout={(e) => setButtonsHeight(e.nativeEvent.layout.height)}
                    ph={px.s15}
                    pb={px.s15}>
                    {closeButton}
                    {finalButtons}
                  </Stack>
                )}
              </>
            )}
          </View>
        </View>
        {bottomView}
      </View>
    );
  }, [
    hideCloseButton,
    disabledCloseButton,
    onRequestClose,
    buttons,
    type,
    horizontalButtons,
    contentAnimation,
    fullHeight,
    fullWidth,
    fullMax,
    finalMaxWidth,
    finalMinWidth,
    backgroundColor,
    theme.colors.background,
    theme.colors.surface,
    theme.colors.textAccent,
    title,
    titleBackgroundColor,
    titleColor,
    contentMaxHeight,
    children,
    bottomView,
  ]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Modal
      presentationStyle='overFullScreen'
      statusBarTranslucent
      navigationBarTranslucent
      transparent
      animationType={ifUndefined(animationType, 'none')}
      onRequestClose={() => {
        if (!preventBackClose) {
          onRequestClose?.();
        }
      }}
      {...props}>
      <>
        {fullMax ? (
          statusBarStyle ? (
            <StatusBar animated barStyle={statusBarStyle} />
          ) : undefined
        ) : (
          <StatusBar animated barStyle={statusBarStyle || 'light-content'} />
        )}
      </>

      <View style={containerViewStyle}>
        <Pressable
          position='absolute'
          left={0}
          top={0}
          right={0}
          bottom={0}
          onPress={() => backdropClose && onRequestClose?.()}
        />
        {keyboardAware ? (
          <KeyboardAwareScrollView
            ref={keyboardAwareScrollViewRef}
            bounces={false}
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            width={fullWidth ? '100%' : undefined}
            onLayout={(e) => setParentHeight(e.nativeEvent.layout.height)}
            {...keyboardAwareScrollViewProps}>
            {content}
          </KeyboardAwareScrollView>
        ) : (
          <View
            flex={1}
            alignItems='center'
            justifyContent={
              type === undefined
                ? 'center'
                : position === 'top'
                ? 'flex-start'
                : position === 'center'
                ? 'center'
                : 'flex-end'
            }
            width={fullWidth ? '100%' : undefined}
            onLayout={(e) => setParentHeight(e.nativeEvent.layout.height)}>
            {content}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default FullScreenDialog;
