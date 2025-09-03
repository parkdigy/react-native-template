import {IconProps} from '../../Icon';
import {LinearGradientProps} from 'react-native-linear-gradient';
import React from 'react';
import {SvgProps} from 'react-native-svg';
import {TouchableOpacityProps} from '../TouchableOpacity';

export type ColorButtonColors =
  | 'purple_violet'
  | 'violet_pink'
  | 'pink_dark_green'
  | 'blue_violet'
  | 'blue_marine'
  | 'deep_blue'
  | 'flare'
  | 'orange_fun'
  | 'jshine'
  | 'combi'
  | 'shroom_haze'
  | 'mystic'
  | 'serv_quick'
  | 'nepal'
  | 'wedding_day_blues'
  | 'azure_pop'
  | 'nighthawk'
  | 'timber'
  | 'sublime_light'
  | 'purpink'
  | 'summer'
  | 'blue_skies'
  | 'grey';

export interface ColorButtonProps
  extends Pick<
      ButtonProps,
      | 'onPress'
      | 'onLongPress'
      | 'onLayout'
      | 'ml'
      | 'mr'
      | 'mt'
      | 'mb'
      | 'mh'
      | 'mv'
      | 'borderRadius'
      | 'borderTopLeftRadius'
      | 'borderTopRightRadius'
      | 'borderBottomLeftRadius'
      | 'borderBottomRightRadius'
    >,
    Pick<LinearGradientProps, 'angle' | 'angleCenter'>,
    Pick<TouchableOpacityProps, 'hitSlop'> {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  color?: ColorButtonColors;
  icon?: IconProps['name'] | React.FC<SvgProps>;
  iconSize?: IconProps['size'];
  iconRight?: boolean;
  labelAlign?: 'left' | 'center' | 'right';
  hideLabel?: boolean;
  labelMinWidth?: number;
  paddingHorizontal?: number;
  disabled?: boolean;
  loading?: boolean;
  flex?: ButtonProps['flex'];
  extraPaddingLeft?: number;
  extraPaddingRight?: number;
  height?: number;
  rotateBackground?: boolean;
  children?: ReactNode;
}

export const ColorButtonColors = {
  purple_violet: ['#8e2de2', '#4a00e0'],
  violet_pink: ['#dd467c', '#a22ff4'],
  pink_dark_green: ['#d4145a', '#1e3c72'],
  blue_violet: ['#a02ff6', '#4570ef'],
  blue_marine: ['#00b0d6', '#2d67b6'],
  deep_blue: ['#5671bd', '#253580'],
  flare: ['#f5af19', '#f12711'],
  orange_fun: ['#fc4a1a', '#f7b733'],
  jshine: ['#12c2e9', '#c471ed', '#f64f59'],
  combi: ['#4c9139', '#799f0c', '#d8d268'],
  shroom_haze: ['#5c258d', '#4389a2'],
  mystic: ['#d7dde8', '#757f9a'],
  serv_quick: ['#29323c', '#485563'],
  nepal: ['#de6161', '#2657eb'],
  wedding_day_blues: ['#40e0d0', '#ff8c00', '#ff0080'],
  azure_pop: ['#ef32d9', '#89fffd'],
  nighthawk: ['#2980b9', '#2c3e50'],
  timber: ['#fc00ff', '#00dbde'],
  sublime_light: ['#fc5c7d', '#6a82fb'],
  purpink: ['#7f00ff', '#e100ff'],
  summer: ['#22c1c3', '#fdbb2d'],
  blue_skies: ['#56ccf2', '#2f80ed'],
  grey: ['#bdc3c7', '#6a6a6a'],
};
