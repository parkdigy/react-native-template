import React from 'react';
import {Text as PaperText} from 'react-native-paper';
import {TextStyle} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {TextProps as Props, TextSize} from './Text.types';

const Text = ({
  size = 'md',
  style,
  color,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  textDecorationLine,
  textDecorationStyle,
  textDecorationColor,
  textShadowColor,
  textShadowOffset,
  textShadowRadius,
  textTransform,
  autoAdjustFontSize,
  adjustsFontSizeToFit,
  numberOfLines,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const customStyle = useMemo(() => {
    const newCustomStyle: Record<string, any> = {};
    if (color !== undefined) {
      switch (color) {
        case 'primary':
          newCustomStyle.color = theme.colors.primary;
          break;
        case 'primary100':
          newCustomStyle.color = theme.colors.primary100;
          break;
        case 'primary200':
          newCustomStyle.color = theme.colors.primary200;
          break;
        case 'primary300':
          newCustomStyle.color = theme.colors.primary300;
          break;
        case 'primary400':
          newCustomStyle.color = theme.colors.primary400;
          break;
        case 'primary500':
          newCustomStyle.color = theme.colors.primary500;
          break;
        case 'primaryAccent':
          newCustomStyle.color = theme.colors.primaryAccent;
          break;
        case 'info':
          newCustomStyle.color = theme.colors.primary;
          break;
        case 'secondary':
          newCustomStyle.color = theme.colors.secondary;
          break;
        case 'tertiary':
          newCustomStyle.color = theme.colors.tertiary;
          break;
        case 'success':
          newCustomStyle.color = theme.colors.success;
          break;
        case 'warning':
          newCustomStyle.color = theme.colors.warning;
          break;
        case 'error':
          newCustomStyle.color = theme.colors.error;
          break;
        case 'blueGray':
          newCustomStyle.color = theme.colors.blueGray;
          break;
        case 'accent':
          newCustomStyle.color = theme.colors.textAccent;
          break;
        case 'right100':
          newCustomStyle.color = theme.colors.textRight100;
          break;
        case 'right200':
          newCustomStyle.color = theme.colors.textRight200;
          break;
        case 'green100':
          newCustomStyle.color = theme.colors.green100;
          break;
        case 'green200':
          newCustomStyle.color = theme.colors.green200;
          break;
        case 'green300':
          newCustomStyle.color = theme.colors.green300;
          break;
        case 'green400':
          newCustomStyle.color = theme.colors.green400;
          break;
        default:
          newCustomStyle.color = color;
          break;
      }
    }
    fontFamily !== undefined && (newCustomStyle.fontFamily = fontFamily);
    fontStyle !== undefined && (newCustomStyle.fontStyle = fontStyle);
    letterSpacing !== undefined && (newCustomStyle.letterSpacing = letterSpacing);
    textAlign !== undefined && (newCustomStyle.textAlign = textAlign);
    textDecorationLine !== undefined && (newCustomStyle.textDecorationLine = textDecorationLine);
    textDecorationStyle !== undefined && (newCustomStyle.textDecorationStyle = textDecorationStyle);
    textDecorationColor !== undefined && (newCustomStyle.textDecorationColor = textDecorationColor);
    textShadowColor !== undefined && (newCustomStyle.textShadowColor = textShadowColor);
    textShadowOffset !== undefined && (newCustomStyle.textShadowOffset = textShadowOffset);
    textShadowRadius !== undefined && (newCustomStyle.textShadowRadius = textShadowRadius);
    textTransform !== undefined && (newCustomStyle.textTransform = textTransform);
    return newCustomStyle;
  }, [
    color,
    fontFamily,
    fontStyle,
    letterSpacing,
    textAlign,
    textDecorationLine,
    textDecorationStyle,
    textDecorationColor,
    textShadowColor,
    textShadowOffset,
    textShadowRadius,
    textTransform,
    theme.colors.primary,
    theme.colors.primary100,
    theme.colors.primary200,
    theme.colors.primary300,
    theme.colors.primary400,
    theme.colors.primary500,
    theme.colors.primaryAccent,
    theme.colors.secondary,
    theme.colors.tertiary,
    theme.colors.success,
    theme.colors.warning,
    theme.colors.error,
    theme.colors.blueGray,
    theme.colors.textAccent,
    theme.colors.textRight100,
    theme.colors.textRight200,
    theme.colors.green100,
    theme.colors.green200,
    theme.colors.green300,
    theme.colors.green400,
  ]);

  const baseFontSize = useMemo(() => (typeof size === 'number' ? size : TextSize[size || 'md'].fontSize), [size]);

  const fontSizeStyle = useMemo(() => ifNotUndefined(fontSize, {fontSize}), [fontSize]);

  const lineHeightStyle = useMemo(() => ifNotUndefined(lineHeight, {lineHeight}), [lineHeight]);

  const finalFontWeight: TextStyle['fontWeight'] = useMemo(() => {
    let fw: Props['fontWeight'];
    if (style) {
      if (Array.isArray(style)) {
        fw = ifNullOrUndefined(util.style.findFontWeight(style), fontWeight);
      } else if (typeof style === 'object') {
        fw = ifNullOrUndefined(style.fontWeight, fontWeight);
      }
    } else {
      fw = fontWeight;
    }

    return (fw !== undefined ? (typeof fw === 'number' ? `${fw}` : fw) : fw) as TextStyle['fontWeight'];
  }, [fontWeight, style]);

  const fontWeightStyle = useMemo(
    () => ({fontWeight: Platform.OS === 'android' ? undefined : finalFontWeight}),
    [finalFontWeight],
  );

  const fontFamilyStyle = useMemo(() => {
    // Light:300, Regular:400, Medium:500, SemiBold:600, Bold:700, ExtraBold:800, Black:900
    if (Platform.OS === 'android') {
      switch (finalFontWeight) {
        case '300':
          return {fontFamily: 'Pretendard-Light'};
        case '500':
          return {fontFamily: 'Pretendard-Medium'};
        case '600':
          return {fontFamily: 'Pretendard-SemiBold'};
        case '700':
          return {fontFamily: 'Pretendard-Bold'};
        case '800':
          return {fontFamily: 'Pretendard-ExtraBold'};
        case '900':
          return {fontFamily: 'Pretendard-Black'};
        default:
          return {fontFamily: 'Pretendard-Regular'};
      }
    } else {
      return {fontFamily: 'Pretendard'};
    }
  }, [finalFontWeight]);

  const finalStyle = useMemo(
    () => [customStyle, baseFontSize, style, fontSizeStyle, lineHeightStyle, fontWeightStyle, fontFamilyStyle],
    [customStyle, baseFontSize, fontSizeStyle, lineHeightStyle, style, fontWeightStyle, fontFamilyStyle],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <CustomComponent
      component={PaperText}
      style={finalStyle}
      adjustsFontSizeToFit={ifUndefined(adjustsFontSizeToFit, autoAdjustFontSize)}
      numberOfLines={ifUndefined(numberOfLines, autoAdjustFontSize ? 1 : undefined)}
      {...props}
    />
  );
};

export default Text;
