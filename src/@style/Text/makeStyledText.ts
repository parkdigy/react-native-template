import styled from 'styled-components/native';

export function makeStyledText<T extends typeof Text>(
  base: T,
  color?: string | number | (({theme}: StyledReactNativePaperTheme) => string | number),
): {
  // 10
  s10w300: T;
  s10w400: T;
  s10w500: T;
  s10w600: T;
  s10w700: T;
  s10w800: T;
  s10w900: T;
  // 11
  s11w300: T;
  s11w400: T;
  s11w500: T;
  s11w600: T;
  s11w700: T;
  s11w800: T;
  s11w900: T;
  // 12
  s12w300: T;
  s12w400: T;
  s12w500: T;
  s12w600: T;
  s12w700: T;
  s12w800: T;
  s12w900: T;
  // 13
  s13w300: T;
  s13w400: T;
  s13w500: T;
  s13w600: T;
  s13w700: T;
  s13w800: T;
  s13w900: T;
  // 14
  s14w300: T;
  s14w400: T;
  s14w500: T;
  s14w600: T;
  s14w700: T;
  s14w800: T;
  s14w900: T;
  // 15
  s15w300: T;
  s15w400: T;
  s15w500: T;
  s15w600: T;
  s15w700: T;
  s15w800: T;
  s15w900: T;
  // 16
  s16w300: T;
  s16w400: T;
  s16w500: T;
  s16w600: T;
  s16w700: T;
  s16w800: T;
  s16w900: T;
  // 17
  s17w300: T;
  s17w400: T;
  s17w500: T;
  s17w600: T;
  s17w700: T;
  s17w800: T;
  s17w900: T;
  // 18
  s18w300: T;
  s18w400: T;
  s18w500: T;
  s18w600: T;
  s18w700: T;
  s18w800: T;
  s18w900: T;
  // 20
  s20w300: T;
  s20w400: T;
  s20w500: T;
  s20w600: T;
  s20w700: T;
  s20w800: T;
  s20w900: T;
  // 30
  s30w300: T;
  s30w400: T;
  s30w500: T;
  s30w600: T;
  s30w700: T;
  s30w800: T;
  s30w900: T;
} {
  if (color) {
    base = styled(base)`
      color: ${color};
    `;
  }

  const map: Dict<T> = {};

  // line-height: ${TextSize[`s${fontSize}`].lineHeight}px;
  ([10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 30] as const).forEach((fontSize) => {
    ([300, 400, 500, 600, 700, 800, 900] as const).forEach((fontWeight) => {
      if (fontSize === 14 && fontWeight === 400) {
        map[`s${fontSize}w${fontWeight}`] = base;
      } else if (fontSize === 14) {
        map[`s${fontSize}w${fontWeight}`] = styled(base)`
          font-weight: ${fontWeight};
        `;
      } else if (fontWeight === 400) {
        map[`s${fontSize}w${fontWeight}`] = styled(base)`
          font-size: ${TextSize[`s${fontSize}`].fontSize}px;
        `;
      } else {
        map[`s${fontSize}w${fontWeight}`] = styled(base)`
          font-size: ${TextSize[`s${fontSize}`].fontSize}px;
          font-weight: ${fontWeight};
        `;
      }
    });
  });

  return map as any;
}

export default makeStyledText;
