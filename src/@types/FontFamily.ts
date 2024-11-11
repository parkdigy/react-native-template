import {DEFAULT_LINE_HEIGHT_SCALE} from '../component/common/Text/Text/Text.types';

export const InternalFontFamily = {} as const;
export type InternalFontFamily = ValueOf<typeof InternalFontFamily>;

export const InternalFontFamilyBold = {} as const;
export type InternalFontFamilyBold = ValueOf<typeof InternalFontFamilyBold>;

export const FontFamily = {
  Pretendard: isIos ? 'Pretendard' : 'Pretendard-Regular',
} as const;
export type FontFamily = ValueOf<typeof FontFamily>;

export const FontFamilyBold = {
  Pretendard: isIos ? 'Pretendard' : 'Pretendard-Bold',
} as const;
export type FontFamilyBold = ValueOf<typeof FontFamilyBold>;

export function _getBoldFontFamily(fontFamily: FontFamily | InternalFontFamily | undefined) {
  switch (fontFamily) {
    case FontFamily.Pretendard:
      return FontFamilyBold.Pretendard;
    default:
      return fontFamily;
  }
}

export function _getFontFamilySizeAdjustValue(
  fontFamily: FontFamily | FontFamilyBold | InternalFontFamily | InternalFontFamilyBold,
) {
  switch (fontFamily) {
    default:
      return 1;
  }
}

export function _getFontLineHeightAdjustValue(
  fontFamily: FontFamily | FontFamilyBold | InternalFontFamily | InternalFontFamilyBold,
) {
  switch (fontFamily) {
    default:
      return DEFAULT_LINE_HEIGHT_SCALE;
  }
}

export function _getFontFamilyDefaultLetterSpacing(
  fontFamily: FontFamily | FontFamilyBold | InternalFontFamily | InternalFontFamilyBold,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  fontSize: number,
) {
  switch (fontFamily) {
    default:
      return 0;
  }
}

export function _getFontFamilyColor(
  fontFamily: FontFamily | FontFamilyBold | InternalFontFamily | InternalFontFamilyBold,
  color: string,
  theme: ReactNativePaperTheme,
) {
  switch (color) {
    case theme.colors.onSurface:
    case theme.colors.textAccent:
    case theme.colors.textRight100:
    case theme.colors.textRight200:
    case theme.colors.gray:
      switch (fontFamily) {
        default:
          return color;
      }
    default:
      return color;
  }
}
