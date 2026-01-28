import {DEFAULT_LINE_HEIGHT_SCALE} from '@/component/common/Text/Text/Text.types';

export const FontFamily = {
  Pretendard: {
    name: 'Pretendard',
    names: [
      'Pretendard',
      'Pretendard-Thin',
      'Pretendard-ExtraLight',
      'Pretendard-Light',
      'Pretendard-Regular',
      'Pretendard-Medium',
      'Pretendard-SemiBold',
      'Pretendard-Bold',
      'Pretendard-ExtraBold',
      'Pretendard-Black',
    ],
    100: isIos ? 'Pretendard' : 'Pretendard-Thin',
    200: isIos ? 'Pretendard' : 'Pretendard-ExtraLight',
    300: isIos ? 'Pretendard' : 'Pretendard-Light',
    400: isIos ? 'Pretendard' : 'Pretendard-Regular',
    500: isIos ? 'Pretendard' : 'Pretendard-Medium',
    600: isIos ? 'Pretendard' : 'Pretendard-SemiBold',
    700: isIos ? 'Pretendard' : 'Pretendard-Bold',
    800: isIos ? 'Pretendard' : 'Pretendard-ExtraBold',
    900: isIos ? 'Pretendard' : 'Pretendard-Black',
  },
} as const;
export type FontFamily = keyof typeof FontFamily;

export const DefaultFontFamily: FontFamily = FontFamily.Pretendard.name;

export function _getFontFamily(
  fontFamily: FontFamily = DefaultFontFamily,
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold' = 400,
) {
  return FontFamily[fontFamily][fontWeight === 'bold' ? 700 : fontWeight];
}

export function _getFontFamilySizeAdjustValue(fontFamily: string) {
  if (contains(FontFamily.Pretendard.names, fontFamily)) {
    return 1;
  } else {
    return 1;
  }
}

export function _getFontLineHeightAdjustValue(fontFamily: string) {
  if (contains(FontFamily.Pretendard.names, fontFamily)) {
    return DEFAULT_LINE_HEIGHT_SCALE;
  } else {
    return DEFAULT_LINE_HEIGHT_SCALE;
  }
}

export function _getFontFamilyDefaultLetterSpacing(fontFamily: string, fontSize: number) {
  if (contains(FontFamily.Pretendard.names, fontFamily)) {
    return fontSize * 0.01;
  } else {
    return 0;
  }
}

export function _getFontFamilyColor(fontFamily: string, color: string, theme: ReactNativePaperTheme) {
  switch (color) {
    case theme.colors.onSurface:
    case theme.colors.textAccent:
    case theme.colors.textRight100:
    case theme.colors.textRight200:
    case theme.colors.gray:
      if (contains(FontFamily.Pretendard.names, fontFamily)) {
        return color;
      } else {
        return color;
      }
    default:
      return color;
  }
}
