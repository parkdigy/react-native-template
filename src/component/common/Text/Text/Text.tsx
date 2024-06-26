import React from 'react';
import {Text as PaperText} from 'react-native-paper';
import {TextStyle} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {TextProps as Props, TextSize} from './Text.types';

const Text = ({
  center,
  size,
  s,
  style,
  color,
  c,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  w,
  letterSpacing,
  lineHeight,
  lh,
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
    const tc = ifUndefined(color, c);
    if (tc !== undefined) {
      switch (tc) {
        case 'primary':
        case 'primary100':
        case 'primary200':
        case 'primary300':
        case 'primary400':
        case 'primary500':
        case 'primaryAccent':
        case 'secondary':
        case 'tertiary':
        case 'success':
        case 'warning':
        case 'error':
        case 'blueGray':
        case 'green100':
        case 'green200':
        case 'green300':
        case 'green400':
        case 'white':
        case 'black':
        case 'gray':
          newCustomStyle.color = theme.colors[tc];
          break;
        case 'info':
          newCustomStyle.color = theme.colors.primary;
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
        default:
          newCustomStyle.color = tc;
          break;
      }
    }
    fontFamily !== undefined && (newCustomStyle.fontFamily = fontFamily);
    fontStyle !== undefined && (newCustomStyle.fontStyle = fontStyle);
    letterSpacing !== undefined && (newCustomStyle.letterSpacing = letterSpacing);
    textAlign !== undefined && (newCustomStyle.textAlign = textAlign);
    center && (newCustomStyle.textAlign = 'center');
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
    c,
    fontFamily,
    fontStyle,
    letterSpacing,
    textAlign,
    center,
    textDecorationLine,
    textDecorationStyle,
    textDecorationColor,
    textShadowColor,
    textShadowOffset,
    textShadowRadius,
    textTransform,
    theme.colors,
  ]);

  const baseFontSize = useMemo(() => {
    const fs = ifUndefined(size, s) || 'md';
    const ts = TextSize[fs as TextSize];
    if (ts) {
      return {fontSize: ts.fontSize};
    } else {
      return {fontSize: fs};
    }
  }, [size, s]);

  const fontSizeStyle = useMemo(() => ifNotUndefined(fontSize, {fontSize}), [fontSize]);

  const lineHeightStyle = useMemo(() => {
    const newLh = ifUndefined(lineHeight, lh);
    return ifNotUndefined(newLh, {lineHeight: newLh});
  }, [lh, lineHeight]);

  const finalFontWeight: TextStyle['fontWeight'] = useMemo(() => {
    let fw: Props['fontWeight'];
    if (style) {
      if (Array.isArray(style)) {
        fw = ifNullOrUndefined(ifNullOrUndefined(util.style.findFontWeight(style), fontWeight), w);
      } else if (typeof style === 'object') {
        fw = ifNullOrUndefined(ifNullOrUndefined(style.fontWeight, fontWeight), w);
      }
    } else {
      fw = ifNullOrUndefined(fontWeight, w);
    }

    return (fw !== undefined ? (typeof fw === 'number' ? `${fw}` : fw) : fw) as TextStyle['fontWeight'];
  }, [fontWeight, style, w]);

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
