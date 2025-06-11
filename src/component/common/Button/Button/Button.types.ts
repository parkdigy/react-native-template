import {ButtonProps as PaperButtonProps} from 'react-native-paper';
import {StyleProp, TextStyle} from 'react-native';
import {CustomComponentStyleProps} from '../../CustomComponent';
import {TextSize} from '../../Text';
import {IconProps} from '../../Icon';

const DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE = 0.84;

export const ButtonSize = {
  xs: {
    fontSize: TextSize['10'].fontSize * tabletSizeFactor,
    lineHeight: TextSize['10'].lineHeight * tabletSizeFactor,
    marginVertical:
      (Math.floor(TextSize['10'].fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10) * tabletSizeFactor,
  },
  sm: {
    fontSize: TextSize['12'].fontSize * tabletSizeFactor,
    lineHeight: TextSize['12'].lineHeight * tabletSizeFactor,
    marginVertical:
      (Math.floor(TextSize['12'].fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10) * tabletSizeFactor,
  },
  md: {
    fontSize: TextSize['14'].fontSize * tabletSizeFactor,
    lineHeight: TextSize['14'].lineHeight * tabletSizeFactor,
    marginVertical:
      (Math.floor(TextSize['14'].fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10) * tabletSizeFactor,
  },
  lg: {
    fontSize: TextSize['16'].fontSize * tabletSizeFactor,
    lineHeight: TextSize['16'].lineHeight * tabletSizeFactor,
    marginVertical:
      (Math.floor(TextSize['16'].fontSize * DEFAULT_BUTTON_MARGIN_VERTICAL_SCALE * 10) / 10) * tabletSizeFactor,
  },
  xl: {
    fontSize: TextSize['18'].fontSize * tabletSizeFactor,
    lineHeight: TextSize['18'].lineHeight * tabletSizeFactor,
    marginVertical: px.s20,
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
  | 'purple'
  | 'white';

export interface ButtonProps
  extends Omit<PaperButtonProps, 'color' | 'mode' | 'elevation' | 'labelStyle' | 'icon'>,
    CustomComponentStyleProps,
    PartialPick<
      TextProps,
      'textDecorationLine' | 'textDecorationStyle' | 'textDecorationColor' | 'lineHeight' | 'bold'
    > {
  icon?: IconProps['name'] | Exclude<Pick<PaperButtonProps, 'icon'>, 'string'>;
  mode?: Exclude<PaperButtonProps['mode'], 'elevated'>;
  size?: ButtonSize;
  color?: ButtonColor;
  labelStyle?: StyleProp<Omit<TextStyle, 'fontSize' | 'fontWeight'>>;
}
