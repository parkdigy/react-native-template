import {TextProps as PaperTextProps} from 'react-native-paper';
import {TextStyle} from 'react-native';
import {CustomComponentStyleProps} from '../../CustomComponent';

export const DEFAULT_LINE_HEIGHT_SCALE = 1.193;

export const TextSize = {
  xxs: {fontSize: 9, lineHeight: 9 * DEFAULT_LINE_HEIGHT_SCALE},
  xs: {fontSize: 10, lineHeight: 10 * DEFAULT_LINE_HEIGHT_SCALE},
  sm: {fontSize: 12, lineHeight: 12 * DEFAULT_LINE_HEIGHT_SCALE},
  md: {fontSize: 14, lineHeight: 14 * DEFAULT_LINE_HEIGHT_SCALE},
  lg: {fontSize: 16, lineHeight: 16 * DEFAULT_LINE_HEIGHT_SCALE},
  xl: {fontSize: 18, lineHeight: 18 * DEFAULT_LINE_HEIGHT_SCALE},
  xxl: {fontSize: 20, lineHeight: 20 * DEFAULT_LINE_HEIGHT_SCALE},
  9: {fontSize: 9, lineHeight: 9 * DEFAULT_LINE_HEIGHT_SCALE},
  10: {fontSize: 10, lineHeight: 10 * DEFAULT_LINE_HEIGHT_SCALE},
  11: {fontSize: 11, lineHeight: 11 * DEFAULT_LINE_HEIGHT_SCALE},
  12: {fontSize: 12, lineHeight: 12 * DEFAULT_LINE_HEIGHT_SCALE},
  13: {fontSize: 13, lineHeight: 13 * DEFAULT_LINE_HEIGHT_SCALE},
  14: {fontSize: 14, lineHeight: 14 * DEFAULT_LINE_HEIGHT_SCALE},
  15: {fontSize: 15, lineHeight: 15 * DEFAULT_LINE_HEIGHT_SCALE},
  16: {fontSize: 16, lineHeight: 16 * DEFAULT_LINE_HEIGHT_SCALE},
  17: {fontSize: 17, lineHeight: 17 * DEFAULT_LINE_HEIGHT_SCALE},
  18: {fontSize: 18, lineHeight: 18 * DEFAULT_LINE_HEIGHT_SCALE},
  19: {fontSize: 19, lineHeight: 19 * DEFAULT_LINE_HEIGHT_SCALE},
  20: {fontSize: 20, lineHeight: 20 * DEFAULT_LINE_HEIGHT_SCALE},
  21: {fontSize: 21, lineHeight: 21 * DEFAULT_LINE_HEIGHT_SCALE},
  22: {fontSize: 22, lineHeight: 22 * DEFAULT_LINE_HEIGHT_SCALE},
  23: {fontSize: 23, lineHeight: 23 * DEFAULT_LINE_HEIGHT_SCALE},
  24: {fontSize: 24, lineHeight: 24 * DEFAULT_LINE_HEIGHT_SCALE},
  25: {fontSize: 25, lineHeight: 25 * DEFAULT_LINE_HEIGHT_SCALE},
  26: {fontSize: 26, lineHeight: 26 * DEFAULT_LINE_HEIGHT_SCALE},
  27: {fontSize: 27, lineHeight: 27 * DEFAULT_LINE_HEIGHT_SCALE},
  28: {fontSize: 28, lineHeight: 28 * DEFAULT_LINE_HEIGHT_SCALE},
  29: {fontSize: 29, lineHeight: 29 * DEFAULT_LINE_HEIGHT_SCALE},
  30: {fontSize: 30, lineHeight: 30 * DEFAULT_LINE_HEIGHT_SCALE},
} as const;
type TTextSize = typeof TextSize;
export type TextSize = keyof TTextSize;

type TextColor =
  | 'primary'
  | 'primary100'
  | 'primary200'
  | 'primary300'
  | 'primary400'
  | 'primary500'
  | 'primaryAccent'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'blueGray'
  | 'accent'
  | 'right100'
  | 'right200'
  | 'green100'
  | 'green200'
  | 'green300'
  | 'green400'
  | 'white'
  | 'black'
  | 'gray'
  | TextStyle['color'];

export interface TextProps
  extends PaperTextProps<string>,
    CustomComponentStyleProps,
    Pick<
      TextStyle,
      | 'fontFamily'
      | 'fontSize'
      | 'fontStyle'
      | 'letterSpacing'
      | 'lineHeight'
      | 'textAlign'
      | 'textDecorationLine'
      | 'textDecorationStyle'
      | 'textDecorationColor'
      | 'textShadowColor'
      | 'textShadowOffset'
      | 'textShadowRadius'
      | 'textTransform'
    > {
  center?: boolean;
  color?: TextColor;
  c?: TextColor;
  size?: TextSize | number;
  s?: TextSize | number;
  fontWeight?: TextStyle['fontWeight'] | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  w?: TextStyle['fontWeight'] | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  lh?: TextStyle['lineHeight'];
  autoAdjustFontSize?: boolean;
}
