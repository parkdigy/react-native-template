import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {useAppState} from '@context';
import {_getFontFamily} from '@types';
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
  maxFontSizeMultiplier = 1.2,
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
  const {fontFamily} = useAppState();

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
          case 'purple':
            return isOn ? theme.colors.onPurple : theme.colors.purple;
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
      {borderRadius: ifUndefined(borderRadius, 50), backgroundColor: ifUndefined(backgroundColor, finalButtonColor)},
      loading || disabled ? {opacity: loading ? 0.6 : 0.3} : undefined,
      style,
    ],
    [backgroundColor, borderRadius, disabled, finalButtonColor, loading, style],
  );

  const finalLabelStyle = useMemo(() => {
    return [
      ButtonSize[size || 'md'],
      {
        fontFamily: fontWeight !== 400 ? _getFontFamily(fontFamily, fontWeight) : fontFamily,
      },
      ifNotUndefined(height, {marginVertical: 0, lineHeight: height}),
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
    fontWeight,
    fontFamily,
    height,
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
      maxFontSizeMultiplier={maxFontSizeMultiplier}
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
