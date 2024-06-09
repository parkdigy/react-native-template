import {TextProps as PaperTextProps} from 'react-native-paper';
import {TextStyle} from 'react-native';
import {CustomComponentStyleProps} from '../../CustomComponent';

export const DEFAULT_LINE_HEIGHT_SCALE = 1.193;

export const TextSize = {
  xxs: {fontSize: 9, lineHeight: 9 * DEFAULT_LINE_HEIGHT_SCALE},
  xs: {fontSize: 10, lineHeight: 10 * DEFAULT_LINE_HEIGHT_SCALE},
  s11: {fontSize: 11, lineHeight: 11 * DEFAULT_LINE_HEIGHT_SCALE},
  sm: {fontSize: 12, lineHeight: 12 * DEFAULT_LINE_HEIGHT_SCALE},
  s13: {fontSize: 13, lineHeight: 13 * DEFAULT_LINE_HEIGHT_SCALE},
  md: {fontSize: 14, lineHeight: 14 * DEFAULT_LINE_HEIGHT_SCALE},
  lg: {fontSize: 16, lineHeight: 16 * DEFAULT_LINE_HEIGHT_SCALE},
  xl: {fontSize: 18, lineHeight: 18 * DEFAULT_LINE_HEIGHT_SCALE},
  xxl: {fontSize: 20, lineHeight: 20 * DEFAULT_LINE_HEIGHT_SCALE},
} as const;
type TTextSize = typeof TextSize;
export type TextSize = keyof TTextSize;

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
  color?:
    | TextStyle['color']
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
    | 'green400';
  size?: TextSize | number;
  fontWeight?: TextStyle['fontWeight'] | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}
