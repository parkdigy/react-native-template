import React from 'react';
import {ViewStyle} from 'react-native';
import {CustomComponentProps as Props} from './CustomComponent.types';

const CustomComponent = React.forwardRef<any, Props>(
  (
    {
      component: Component,
      componentProps,
      style,
      bypassStyleProps,
      row,
      wrap,
      flex,
      flexDirection,
      flexWrap,
      flexGrow,
      flexShrink,
      flexBasis,
      alignItems,
      alignContent,
      alignSelf,
      justifyContent,
      display,
      opacity,
      overflow,
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      borderTopColor,
      borderTopWidth,
      borderBottomColor,
      borderBottomWidth,
      borderLeftColor,
      borderLeftWidth,
      borderRightColor,
      borderRightWidth,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      m,
      mh,
      mv,
      ml,
      mr,
      mt,
      mb,
      margin,
      marginBottom,
      marginEnd,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginStart,
      marginTop,
      marginVertical,
      p,
      ph,
      pv,
      pl,
      pr,
      pt,
      pb,
      padding,
      paddingBottom,
      paddingEnd,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingStart,
      paddingTop,
      paddingVertical,
      width,
      height,
      position,
      left,
      right,
      top,
      bottom,
      minHeight,
      maxHeight,
      minWidth,
      maxWidth,
      gap,
      shadowColor,
      shadowOpacity,
      shadowOffset,
      shadowRadius,
      ...props
    },
    ref,
  ) => {
    const stylePropValues = useMemo(
      (): Record<string, any> => ({
        flex,
        flexDirection,
        flexWrap,
        flexGrow,
        flexShrink,
        flexBasis,
        alignItems,
        alignContent,
        alignSelf,
        justifyContent,
        display,
        opacity,
        overflow,
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        borderTopColor,
        borderTopWidth,
        borderBottomColor,
        borderBottomWidth,
        borderLeftColor,
        borderLeftWidth,
        borderRightColor,
        borderRightWidth,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        m,
        mh,
        mv,
        ml,
        mr,
        mt,
        mb,
        margin,
        marginBottom,
        marginEnd,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginStart,
        marginTop,
        marginVertical,
        p,
        ph,
        pv,
        pl,
        pr,
        pt,
        pb,
        padding,
        paddingBottom,
        paddingEnd,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        paddingStart,
        paddingTop,
        paddingVertical,
        width,
        height,
        position,
        left,
        right,
        top,
        bottom,
        minHeight,
        maxHeight,
        minWidth,
        maxWidth,
        gap,
        shadowColor,
        shadowOpacity,
        shadowOffset,
        shadowRadius,
      }),
      [
        flex,
        flexDirection,
        flexWrap,
        flexGrow,
        flexShrink,
        flexBasis,
        alignItems,
        alignContent,
        alignSelf,
        justifyContent,
        display,
        opacity,
        overflow,
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        borderTopColor,
        borderTopWidth,
        borderBottomColor,
        borderBottomWidth,
        borderLeftColor,
        borderLeftWidth,
        borderRightColor,
        borderRightWidth,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        m,
        mh,
        mv,
        ml,
        mr,
        mt,
        mb,
        margin,
        marginBottom,
        marginEnd,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginStart,
        marginTop,
        marginVertical,
        p,
        ph,
        pv,
        pl,
        pr,
        pt,
        pb,
        padding,
        paddingBottom,
        paddingEnd,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        paddingStart,
        paddingTop,
        paddingVertical,
        width,
        height,
        position,
        left,
        right,
        top,
        bottom,
        minHeight,
        maxHeight,
        minWidth,
        maxWidth,
        gap,
        shadowColor,
        shadowOpacity,
        shadowOffset,
        shadowRadius,
      ],
    );

    const flexDirectionStyle = useMemo(
      (): ViewStyle | undefined => (row ? {flexDirection: 'row', alignItems: 'center'} : undefined),
      [row],
    );

    const flexWrapStyle = useMemo(() => (wrap ? {flexWrap: 'wrap'} : undefined), [wrap]);

    const customStyle = useMemo(() => {
      const newCustomStyle: Record<string, any> = {};

      const keyMap: Record<string, string> = {
        p: 'padding',
        ph: 'paddingHorizontal',
        pv: 'paddingVertical',
        pl: 'paddingLeft',
        pr: 'paddingRight',
        pt: 'paddingTop',
        pb: 'paddingBottom',
        m: 'margin',
        mh: 'marginHorizontal',
        mv: 'marginVertical',
        ml: 'marginLeft',
        mr: 'marginRight',
        mt: 'marginTop',
        mb: 'marginBottom',
      };

      Object.keys(stylePropValues).forEach((key) => {
        const value = stylePropValues[key];
        if (value !== undefined && (bypassStyleProps === undefined || !bypassStyleProps.includes(key))) {
          newCustomStyle[keyMap[key] || key] = value;
        }
      });

      return newCustomStyle;
    }, [bypassStyleProps, stylePropValues]);

    const finalStyle = useMemo(
      () => [flexDirectionStyle, flexWrapStyle, customStyle, style],
      [flexDirectionStyle, flexWrapStyle, customStyle, style],
    );

    const bypassProps = useMemo(() => {
      const newBypassProps: Record<string, any> = {};
      if (bypassStyleProps) {
        (bypassStyleProps as string[]).forEach((key) => {
          newBypassProps[key] = stylePropValues[key];
        });
      }
      return newBypassProps;
    }, [bypassStyleProps, stylePropValues]);

    return <Component ref={ref} style={finalStyle} {...componentProps} {...props} {...bypassProps} />;
  },
);

export default CustomComponent;
