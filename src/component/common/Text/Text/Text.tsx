import React, {CSSProperties} from 'react';
import {LayoutChangeEvent, StyleProp, TextStyle} from 'react-native';
import {useAppState} from '@context';
import {
  _getFontFamily,
  _getFontFamilyColor,
  _getFontFamilyDefaultLetterSpacing,
  _getFontFamilySizeAdjustValue,
  _getFontLineHeightAdjustValue,
  DefaultFontFamily,
} from '@types';
import CustomComponent from '../../CustomComponent';
import {TextProps as Props} from './Text.types';

const Text = React.forwardRef<NativeText, Props>(
  (
    {
      center,
      size,
      s,
      fontSize,
      bold,
      color,
      c,
      lineHeight,
      lh,
      fontWeight,
      w,
      fontFamily,
      fontStyle,
      style,
      letterSpacing,
      textAlign,
      textDecorationLine,
      textDecorationStyle,
      textDecorationColor,
      textShadowColor,
      textShadowOffset,
      textShadowRadius,
      textTransform,
      maxFontSizeMultiplier = 1.2,
      autoAdjustFontSize,
      adjustsFontSizeToFit,
      numberOfLines,
      singleLineCenter,
      animation,
      animationEndDelay,
      noAutoTabletSize,
      onAnimationEnd,
      onLayout,
      delay,
      ...props
    },
    ref,
  ) => {
    /********************************************************************************************************************
     * Use
     * ******************************************************************************************************************/

    const theme = useTheme();
    const {fontFamily: appFontFamily} = useAppState();

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [containerHeight, setContainerHeight] = useState(0);

    /********************************************************************************************************************
     * Memo
     * ******************************************************************************************************************/

    const finalFontWeight: Props['fontWeight'] = useMemo(() => {
      let styleFontWeight: StyleProp<TextStyle['fontWeight']> | undefined;
      let finalStyleFontWeight: Props['fontWeight'] | undefined;

      function extractFontWeight(obj: any) {
        if (obj && typeof obj === 'object') {
          if (Array.isArray(obj)) {
            for (const item of obj) {
              extractFontWeight(item);
            }
          } else if ('fontWeight' in obj) {
            styleFontWeight = obj.fontWeight;
          }
        }
      }
      extractFontWeight(style);

      if (styleFontWeight !== undefined) {
        switch (styleFontWeight) {
          case null:
          case false:
          case '':
            finalStyleFontWeight = 400;
            break;
          case 100:
          case '100':
          case 'thin':
            finalStyleFontWeight = 100;
            break;
          case 200:
          case '200':
          case 'ultralight':
            finalStyleFontWeight = 200;
            break;
          case 300:
          case '300':
          case 'light':
            finalStyleFontWeight = 300;
            break;
          case 400:
          case '400':
          case 'normal':
          case 'regular':
          case 'condensed':
            finalStyleFontWeight = 400;
            break;
          case 500:
          case '500':
          case 'medium':
            finalStyleFontWeight = 500;
            break;
          case 600:
          case '600':
          case 'semibold':
            finalStyleFontWeight = 600;
            break;
          case 700:
          case '700':
          case 'bold':
          case 'condensedBold':
            finalStyleFontWeight = 700;
            break;
          case 800:
          case '800':
          case 'heavy':
            finalStyleFontWeight = 800;
            break;
          case 900:
          case '900':
          case 'black':
            finalStyleFontWeight = 900;
            break;
        }
      }

      return bold ? 'bold' : ifUndefined(ifUndefined(fontWeight, ifUndefined(w, finalStyleFontWeight)), 400);
    }, [bold, fontWeight, style, w]);

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
      } else {
        newCustomStyle.color = theme.colors.onSurface;
      }

      newCustomStyle.fontFamily = ifUndefined(fontFamily, appFontFamily);
      if (contains([undefined, 'default'], newCustomStyle.fontFamily)) {
        newCustomStyle.fontFamily = DefaultFontFamily;
      }
      if (finalFontWeight) {
        newCustomStyle.fontFamily = _getFontFamily(newCustomStyle.fontFamily, finalFontWeight);
      }

      if (newCustomStyle.color) {
        newCustomStyle.color = _getFontFamilyColor(newCustomStyle.fontFamily, newCustomStyle.color, theme);
      }

      fontStyle !== undefined && (newCustomStyle.fontStyle = fontStyle);
      letterSpacing !== undefined && (newCustomStyle.letterSpacing = letterSpacing);

      newCustomStyle.fontSize =
        (ifUndefined(ifUndefined(size, s), fontSize) || 14) * _getFontFamilySizeAdjustValue(newCustomStyle.fontFamily);

      if (!noAutoTabletSize) {
        newCustomStyle.fontSize *= tabletSizeFactor;
      }

      newCustomStyle.letterSpacing =
        (newCustomStyle.letterSpacing || 0) +
        _getFontFamilyDefaultLetterSpacing(newCustomStyle.fontFamily, newCustomStyle.fontSize);

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
      appFontFamily,
      c,
      color,
      finalFontWeight,
      fontFamily,
      fontSize,
      fontStyle,
      letterSpacing,
      noAutoTabletSize,
      s,
      size,
      textAlign,
      textDecorationColor,
      textDecorationLine,
      textDecorationStyle,
      textShadowColor,
      textShadowOffset,
      textShadowRadius,
      textTransform,
      theme,
    ]);

    const lineHeightStyle = useMemo(() => {
      let newLh = ifUndefined(lineHeight, lh);
      if (!noAutoTabletSize && newLh) {
        newLh *= tabletSizeFactor;
      }

      return {
        lineHeight: Math.floor(
          ifUndefined(newLh, customStyle.fontSize * _getFontLineHeightAdjustValue(customStyle.fontFamily)),
        ),
      };
    }, [customStyle.fontFamily, customStyle.fontSize, lh, lineHeight, noAutoTabletSize]);

    const paddingHeight = useMemo(() => {
      if (singleLineCenter) {
        const paddingTop = ifUndefined(
          props.paddingTop,
          ifUndefined(props.pt, ifUndefined(props.paddingVertical, ifUndefined(props.pv, 0))),
        );
        const paddingBottom = ifUndefined(
          props.paddingBottom,
          ifUndefined(props.pt, ifUndefined(props.paddingVertical, ifUndefined(props.pv, 0))),
        );
        return paddingTop + paddingBottom;
      } else {
        return 0;
      }
    }, [props.paddingBottom, props.paddingTop, props.paddingVertical, props.pt, props.pv, singleLineCenter]);

    const textAlignStyle = useMemo(() => {
      const newTextAlignStyle: CSSProperties = {};
      if (center) {
        newTextAlignStyle.textAlign = 'center';
      } else if (singleLineCenter) {
        const isSingleLine = singleLineCenter
          ? containerHeight - paddingHeight < lineHeightStyle.lineHeight * 2
          : false;
        if (isSingleLine) {
          newTextAlignStyle.textAlign = 'center';
        }
      }
      return newTextAlignStyle;
    }, [center, containerHeight, lineHeightStyle.lineHeight, paddingHeight, singleLineCenter]);

    const fontWeightStyle = useMemo(() => ({fontWeight: isAndroid ? undefined : finalFontWeight}), [finalFontWeight]);

    const finalStyle = useMemo(
      () => [
        customStyle,
        lineHeightStyle,
        textAlignStyle,
        style,
        fontWeightStyle,
      ] /** 반드시 fontWeightStyle 이 style 다음에 와야 함 */,
      [customStyle, lineHeightStyle, textAlignStyle, style, fontWeightStyle],
    );

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        setContainerHeight(event.nativeEvent.layout.height);
        onLayout?.(event);
      },
      [onLayout],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <CustomComponent
        ref={ref}
        component={animation ? Animatable.Text : NativeText}
        animation={animation !== 'none' && animation ? animation : undefined}
        delay={animation !== 'none' && animation ? delay : undefined}
        style={finalStyle}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        adjustsFontSizeToFit={ifUndefined(adjustsFontSizeToFit, autoAdjustFontSize)}
        numberOfLines={ifUndefined(numberOfLines, autoAdjustFontSize ? 1 : undefined)}
        onAnimationEnd={
          onAnimationEnd && animationEndDelay
            ? () => setTimeout(() => onAnimationEnd(), animationEndDelay)
            : onAnimationEnd
        }
        onLayout={singleLineCenter ? handleLayout : onLayout}
        {...props}
      />
    );
  },
);

export default Text;
