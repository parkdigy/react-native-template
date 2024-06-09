import {ButtonProps as PaperButtonProps} from 'react-native-paper';
import {CustomComponentStyleProps} from '../../CustomComponent';
import {TextSize} from '../../Text';

const DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE = 0.84;

export const ButtonSize = {
  xs: {
    fontSize: TextSize.xs.fontSize,
    lineHeight: TextSize.xs.lineHeight,
    marginVertical: Math.floor(TextSize.xs.fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10,
  },
  sm: {
    fontSize: TextSize.sm.fontSize,
    lineHeight: TextSize.sm.lineHeight,
    marginVertical: Math.floor(TextSize.sm.fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10,
  },
  md: {
    fontSize: TextSize.md.fontSize,
    lineHeight: TextSize.md.lineHeight,
    marginVertical: Math.floor(TextSize.md.fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10,
  },
  lg: {
    fontSize: TextSize.lg.fontSize,
    lineHeight: TextSize.lg.lineHeight,
    marginVertical: Math.floor(TextSize.lg.fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10,
  },
  xl: {
    fontSize: TextSize.lg.fontSize,
    lineHeight: TextSize.lg.lineHeight,
    marginVertical: 20,
  },
  // xl: {
  //   fontSize: TextSize.xl.fontSize,
  //   lineHeight: TextSize.xl.lineHeight,
  //   marginVertical: Math.floor(TextSize.xl.fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10,
  // },
} as const;
type TButtonSize = typeof ButtonSize;
export type ButtonSize = keyof TButtonSize;

export type ButtonColor =
  | 'primary'
  | 'primary100'
  | 'primary200'
  | 'primary300'
  | 'primary400'
  | 'primary500'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'gray'
  | 'blueGray'
  | 'white';

export interface ButtonProps
  extends Omit<PaperButtonProps, 'color' | 'mode' | 'elevation'>,
    CustomComponentStyleProps,
    PartialPick<
      TextProps,
      'fontSize' | 'fontWeight' | 'textDecorationLine' | 'textDecorationStyle' | 'textDecorationColor' | 'lineHeight'
    > {
  mode?: Exclude<PaperButtonProps['mode'], 'elevated'>;
  size?: ButtonSize;
  color?: ButtonColor;
}
