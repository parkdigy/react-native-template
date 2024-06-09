import React from 'react';
import {ViewStyle} from 'react-native';

export interface CustomComponentStyleProps
  extends Pick<
    ViewStyle,
    | 'flex'
    | 'flexDirection'
    | 'flexWrap'
    | 'flexGrow'
    | 'flexShrink'
    | 'flexBasis'
    | 'alignItems'
    | 'alignContent'
    | 'alignSelf'
    | 'justifyContent'
    | 'display'
    | 'opacity'
    | 'overflow'
    | 'backgroundColor'
    | 'borderColor'
    | 'borderWidth'
    | 'borderRadius'
    | 'borderTopColor'
    | 'borderTopWidth'
    | 'borderBottomColor'
    | 'borderBottomWidth'
    | 'borderLeftColor'
    | 'borderLeftWidth'
    | 'borderRightColor'
    | 'borderRightWidth'
    | 'borderTopLeftRadius'
    | 'borderTopRightRadius'
    | 'borderBottomLeftRadius'
    | 'borderBottomRightRadius'
    | 'margin'
    | 'marginBottom'
    | 'marginEnd'
    | 'marginHorizontal'
    | 'marginLeft'
    | 'marginRight'
    | 'marginStart'
    | 'marginTop'
    | 'marginVertical'
    | 'padding'
    | 'paddingBottom'
    | 'paddingEnd'
    | 'paddingHorizontal'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingStart'
    | 'paddingTop'
    | 'paddingVertical'
    | 'width'
    | 'height'
    | 'position'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'minHeight'
    | 'maxHeight'
    | 'minWidth'
    | 'maxWidth'
    | 'gap'
    | 'shadowColor'
    | 'shadowOpacity'
    | 'shadowOffset'
    | 'shadowRadius'
    | 'elevation'
  > {
  row?: boolean;
  wrap?: boolean;
  m?: ViewStyle['margin'];
  mh?: ViewStyle['marginHorizontal'];
  mv?: ViewStyle['marginVertical'];
  ml?: ViewStyle['margin'];
  mr?: ViewStyle['marginRight'];
  mt?: ViewStyle['marginTop'];
  mb?: ViewStyle['marginBottom'];
  p?: ViewStyle['padding'];
  ph?: ViewStyle['paddingHorizontal'];
  pv?: ViewStyle['paddingVertical'];
  pl?: ViewStyle['padding'];
  pr?: ViewStyle['paddingRight'];
  pt?: ViewStyle['paddingTop'];
  pb?: ViewStyle['paddingBottom'];
  bypassStyleProps?: string[];
}

export interface CustomComponentProps extends CustomComponentStyleProps {
  [key: string]: any;
  component: React.ComponentType<any>;
  componentProps: Dict;
}
