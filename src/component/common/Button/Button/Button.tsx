import React from 'react';
import {Falsy, GestureResponderEvent, RecursiveArray, RegisteredStyle, TextStyle} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {ButtonProps as Props, ButtonSize} from './Button.types';

const Button = ({
  style,
  size = 'md',
  mode = 'contained',
  color = 'primary',
  icon,
  borderColor,
  backgroundColor,
  borderRadius,
  labelStyle,
  buttonColor,
  textColor,
  fontSize,
  fontWeight = 700,
  textDecorationLine,
  textDecorationStyle,
  textDecorationColor,
  lineHeight,
  loading,
  disabled,
  height,
  width,
  mh,
  marginHorizontal,
  onPress,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const getColor = useCallback(
    (isOn?: boolean, isContainer?: boolean) => {
      if (isContainer) {
        switch (color) {
          case 'secondary':
            return isOn ? theme.colors.onSecondaryContainer : theme.colors.secondaryContainer;
          case 'tertiary':
            return isOn ? theme.colors.onTertiaryContainer : theme.colors.tertiaryContainer;
          case 'error':
            return isOn ? theme.colors.onErrorContainer : theme.colors.errorContainer;
          case 'success':
            return isOn ? theme.colors.onSuccessContainer : theme.colors.successContainer;
          case 'warning':
            return isOn ? theme.colors.onWarningContainer : theme.colors.warningContainer;
          case 'gray':
            return isOn ? theme.colors.onGrayContainer : theme.colors.grayContainer;
          case 'blueGray':
            return isOn ? theme.colors.onBlueGrayContainer : theme.colors.blueGrayContainer;
          default:
            return isOn ? theme.colors.onPrimaryContainer : theme.colors.primaryContainer;
        }
      } else {
        switch (color) {
          case 'primary100':
            return isOn ? theme.colors.onPrimary100 : theme.colors.primary100;
          case 'primary200':
            return isOn ? theme.colors.onPrimary200 : theme.colors.primary200;
          case 'primary300':
            return isOn ? theme.colors.onPrimary300 : theme.colors.primary300;
          case 'primary400':
            return isOn ? theme.colors.onPrimary400 : theme.colors.primary400;
          case 'primary500':
            return isOn ? theme.colors.onPrimary500 : theme.colors.primary500;
          case 'secondary':
            return isOn ? theme.colors.onSecondary : theme.colors.secondary;
          case 'tertiary':
            return isOn ? theme.colors.onTertiary : theme.colors.tertiary;
          case 'error':
            return isOn ? theme.colors.onError : theme.colors.error;
          case 'success':
            return isOn ? theme.colors.onSuccess : theme.colors.success;
          case 'warning':
            return isOn ? theme.colors.onWarning : theme.colors.warning;
          case 'gray':
            return isOn ? theme.colors.onGray : theme.colors.gray;
          case 'blueGray':
            return isOn ? theme.colors.onBlueGray : theme.colors.blueGray;
          case 'white':
            return isOn ? theme.colors.onSurface : theme.dark ? theme.colors.black : theme.colors.white;
          default:
            return isOn ? theme.colors.onPrimary : theme.colors.primary;
        }
      }
    },
    [color, theme],
  );

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalBorderColor = useMemo(() => {
    switch (mode) {
      case 'outlined':
        return borderColor || getColor();
      default:
        return borderColor;
    }
  }, [mode, borderColor, getColor]);

  const finalButtonColor = useMemo(() => {
    switch (mode) {
      case 'contained':
        return buttonColor || getColor();
      case 'contained-tonal':
        return buttonColor || getColor(false, true);
      default:
        return buttonColor;
    }
  }, [mode, buttonColor, getColor]);

  const finalTextColor = useMemo(() => {
    switch (mode) {
      case 'contained':
        return textColor || getColor(true);
      case 'contained-tonal':
        return textColor || getColor(true, true);
      default:
        return textColor || getColor();
    }
  }, [mode, textColor, getColor]);

  const finalStyle = useMemo(
    () => [
      {borderRadius: ifUndefined(borderRadius, 10), backgroundColor: ifUndefined(backgroundColor, finalButtonColor)},
      loading || disabled ? {opacity: loading ? 0.6 : 0.3} : undefined,
      style,
    ],
    [backgroundColor, borderRadius, disabled, finalButtonColor, loading, style],
  );

  const finalLabelStyle = useMemo(() => {
    let fw: Props['fontWeight'];
    if (labelStyle) {
      if (Array.isArray(labelStyle)) {
        fw = ifNullOrUndefined(findFontWeight(labelStyle), fontWeight);
      } else if (typeof labelStyle === 'object') {
        fw = ifNullOrUndefined(labelStyle.fontWeight, fontWeight);
      }
    } else {
      fw = fontWeight;
    }

    const finalFontWeight = (
      fw !== undefined ? (typeof fw === 'number' ? `${fw}` : fw) : fw
    ) as TextStyle['fontWeight'];

    let fontFamily: TextStyle['fontFamily'];
    if (Platform.OS === 'android') {
      switch (finalFontWeight) {
        case '300':
          fontFamily = 'Pretendard-Light';
          break;
        case '500':
          fontFamily = 'Pretendard-Medium';
          break;
        case '600':
          fontFamily = 'Pretendard-SemiBold';
          break;
        case '700':
          fontFamily = 'Pretendard-Bold';
          break;
        case '800':
          fontFamily = 'Pretendard-ExtraBold';
          break;
        case '900':
          fontFamily = 'Pretendard-Black';
          break;
        default:
          fontFamily = 'Pretendard-Regular';
          break;
      }
    } else {
      fontFamily = 'Pretendard';
    }

    return [
      ButtonSize[size || 'md'],
      {fontFamily},
      ifNotUndefined(height, {marginVertical: 0, lineHeight: height}),
      ifNotUndefined(fontSize, {fontSize}),
      ifNotUndefined(fontWeight, {fontWeight}),
      ifNotUndefined(textDecorationLine, {textDecorationLine}),
      ifNotUndefined(textDecorationStyle, {textDecorationStyle}),
      ifNotUndefined(textDecorationColor, {textDecorationColor}),
      ifNotUndefined(lineHeight, {lineHeight}),
      ifNotUndefined(width, {marginHorizontal: mh || marginHorizontal || 0}),
      {color: ifUndefined(textColor, finalTextColor)},
      labelStyle,
    ];
  }, [
    size,
    height,
    fontSize,
    fontWeight,
    textDecorationLine,
    textDecorationStyle,
    textDecorationColor,
    lineHeight,
    width,
    mh,
    marginHorizontal,
    textColor,
    finalTextColor,
    labelStyle,
  ]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      onPress?.(e);
    },
    [onPress],
  );

  const handleIcon = useCallback(
    ({color: iconColor}: {color: string}) => {
      if (typeof icon === 'string') {
        return <Icon name={icon} color={iconColor} size={18} />;
      } else {
        return undefined;
      }
    },
    [icon],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <CustomComponent
      component={PaperButton}
      mode={mode}
      borderColor={finalBorderColor}
      labelStyle={finalLabelStyle}
      style={finalStyle}
      loading={loading}
      disabled={disabled}
      width={width}
      mh={mh}
      marginHorizontal={marginHorizontal}
      icon={typeof icon === 'string' ? handleIcon : icon}
      onPress={loading ? undefined : handlePress}
      {...props}
    />
  );
};

export default Button;

/********************************************************************************************************************
 * findFontWeight
 * ******************************************************************************************************************/
const findFontWeight = (s: RecursiveArray<Falsy | TextStyle | RegisteredStyle<TextStyle>>): TextStyle['fontWeight'] => {
  let fw: TextStyle['fontWeight'];
  for (const s2 of s.reverse()) {
    if (Array.isArray(s2)) {
      fw = findFontWeight(s2);
    } else if (typeof s2 === 'object') {
      if ((s2 as TextStyle).fontWeight !== undefined) {
        fw = (s2 as TextStyle).fontWeight;
      }
    }
    if (fw !== undefined) {
      break;
    }
  }
  return fw;
};
