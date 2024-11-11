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
  margin?: number;
  marginBottom?: number;
  marginEnd?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginStart?: number;
  marginTop?: number;
  marginVertical?: number;
  padding?: number;
  paddingBottom?: number;
  paddingEnd?: number;
  paddingHorizontal?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingStart?: number;
  paddingTop?: number;
  paddingVertical?: number;
  m?: number;
  mh?: number;
  mv?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  p?: number;
  ph?: number;
  pv?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  bypassStyleProps?: string[];
}

export interface CustomComponentProps extends CustomComponentStyleProps {
  [key: string]: any;
  component: React.ComponentType<any>;
  componentProps: Dict;
}
