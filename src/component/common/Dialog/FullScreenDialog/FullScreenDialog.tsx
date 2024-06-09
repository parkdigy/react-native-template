import React from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hasNotch} from 'react-native-device-info';
import {Text_16} from '@style';
import {FullScreenDialogProps as Props} from './FullScreenDialog.types';

const FullScreenDialog = ({
  children,
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
  animationType,
  backdropClose,
  hideCloseButton,
  disabledCloseButton,
  bottomView,
  buttons,
  statusBarStyle,
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
   * State
   * ******************************************************************************************************************/

  const [parentHeight, setParentHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);
  const [buttonsHeight, setButtonsHeight] = useState(0);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const containerViewStyle: ViewProps['style'] = useMemo(
    () => ({
      flex: 1,
      paddingTop: fullMax ? 0 : isIos && !hasNotch() ? safeAreaInsets.top + 16 : safeAreaInsets.top,
      paddingBottom: fullMax ? 0 : isIos && !hasNotch() ? safeAreaInsets.bottom + 24 : safeAreaInsets.bottom,
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
    () => parentHeight - titleHeight - buttonsHeight - (Platform.OS === 'ios' ? 0 : 24),
    [buttonsHeight, parentHeight, titleHeight],
  );

  const content = useMemo(
    () => (
      <View
        flex={fullHeight ? 1 : undefined}
        alignItems='center'
        justifyContent='center'
        width={fullWidth ? '100%' : undefined}
        ph={fullWidth ? (fullMax ? 0 : 24) : undefined}
        pv={Platform.OS !== 'ios' ? (fullMax ? 0 : 24) : 0}>
        <View
          flex={fullHeight ? 1 : undefined}
          width='100%'
          maxWidth={finalMaxWidth}
          minWidth={finalMinWidth}
          backgroundColor={theme.colors.background}
          overflow='hidden'
          borderRadius={fullMax ? 0 : 20}>
          <View flex={fullHeight ? 1 : undefined}>
            {title && (
              <View
                pv={18}
                ph={16}
                backgroundColor={ifUndefined(titleBackgroundColor, theme.colors.surface)}
                justifyContent='center'
                onLayout={(e) => setTitleHeight(e.nativeEvent.layout.height)}>
                {typeof title === 'string' ? (
                  <Text_16 fontWeight={600} color={ifUndefined(titleColor, theme.colors.textAccent)}>
                    {title}
                  </Text_16>
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

            <Stack row center mb={-1} onLayout={(e) => setButtonsHeight(e.nativeEvent.layout.height)}>
              {!hideCloseButton && (
                <Button
                  flex={1}
                  color='white'
                  disabled={disabledCloseButton}
                  labelStyle={{paddingVertical: 5, color: theme.colors.onSurface, fontWeight: '700'}}
                  borderRadius={0}
                  onPress={() => onRequestClose && onRequestClose()}>
                  닫기
                </Button>
              )}
              {buttons && (
                <>
                  {Array.isArray(buttons) ? (
                    buttons.map((button, idx) => (
                      <Button
                        key={idx}
                        flex={1}
                        color={button.color}
                        disabled={button.disabled}
                        loading={button.loading}
                        labelStyle={{paddingVertical: 5, fontWeight: '700'}}
                        borderRadius={0}
                        onPress={button.onPress}>
                        {button.label}
                      </Button>
                    ))
                  ) : (
                    <Button
                      flex={1}
                      color={buttons.color}
                      disabled={buttons.disabled}
                      loading={buttons.loading}
                      labelStyle={{paddingVertical: 5, fontWeight: '700'}}
                      borderRadius={0}
                      onPress={buttons.onPress}>
                      {buttons.label}
                    </Button>
                  )}
                </>
              )}
            </Stack>
          </View>
        </View>
        {bottomView}
      </View>
    ),
    [
      bottomView,
      buttons,
      children,
      contentMaxHeight,
      disabledCloseButton,
      finalMaxWidth,
      finalMinWidth,
      fullHeight,
      fullMax,
      fullWidth,
      hideCloseButton,
      onRequestClose,
      theme.colors.background,
      theme.colors.onSurface,
      theme.colors.surface,
      theme.colors.textAccent,
      title,
      titleBackgroundColor,
      titleColor,
    ],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Modal
      presentationStyle='overFullScreen'
      transparent
      animationType={ifUndefined(animationType, 'none')}
      onRequestClose={() => onRequestClose && onRequestClose()}
      {...props}>
      {isIos && (
        <>
          {fullMax ? (
            statusBarStyle ? (
              <StatusBar animated barStyle={statusBarStyle} />
            ) : undefined
          ) : (
            <StatusBar animated barStyle={statusBarStyle || 'light-content'} />
          )}
        </>
      )}
      <View style={containerViewStyle}>
        <Pressable
          position='absolute'
          left={0}
          top={0}
          right={0}
          bottom={0}
          onPress={() => backdropClose && onRequestClose && onRequestClose()}
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
            justifyContent='center'
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
