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
  | 'grey';

export interface ColorButtonProps {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  color?: ColorButtonColors;
  icon?: IconProps['name'];
  iconSize?: IconProps['size'];
  iconRight?: boolean;
  labelAlign?: 'left' | 'center' | 'right';
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
  purple_violet: ['#8E2DE2', '#4A00E0'],
  violet_pink: ['#dd467c', '#a22ff4'],
  pink_dark_green: ['#D4145A', '#1E3C72'],
  blue_violet: ['#a02ff6', '#4570ef'],
  blue_marine: ['#00b0d6', '#2d67b6'],
  deep_blue: ['#5671bd', '#253580'],
  flare: ['#f5af19', '#f12711'],
  orange_fun: ['#fc4a1a', '#f7b733'],
  jshine: ['#12c2e9', '#c471ed', '#f64f59'],
  combi: ['#00416A', '#799F0C', '#FFE000'],
  shroom_haze: ['#5C258D', '#4389A2'],
  mystic: ['#D7DDE8', '#757F9A'],
  serv_quick: ['#29323c', '#485563'],
  grey: ['#bdc3c7', '#6a6a6a'],
};
