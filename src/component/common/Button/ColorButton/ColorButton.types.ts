import {GestureResponderEvent} from 'react-native';
import {IconProps} from '../../Icon';

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
  | 'grey';

export interface ColorButtonProps {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  color?: ColorButtonColors;
  icon?: IconProps['name'];
  iconSize?: IconProps['size'];
  iconRight?: boolean;
  labelAlign?: 'left' | 'center' | 'right';
  hideLabel?: boolean;
  disabled?: boolean;
  flex?: ButtonProps['flex'];
  extraPaddingLeft?: number;
  extraPaddingRight?: number;
  height?: number;
  rotateBackground?: boolean;
  children: ReactNode;
  onPress?(event: GestureResponderEvent): void;
  onLongPress?(event: GestureResponderEvent): void;
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
  grey: ['#bdc3c7', '#6a6a6a'],
};
