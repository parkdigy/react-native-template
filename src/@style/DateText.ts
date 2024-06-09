import styled from 'styled-components/native';

export const DateText_12 = styled(DateText)`
  font-size: ${TextSize.sm.fontSize}px;
  line-height: ${TextSize.sm.lineHeight}px;
`;

export const DateText_12_L16 = styled(DateText_12)`
  line-height: 16px;
`;

export const DateText_12_Right100 = styled(DateText_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight100};
`;

export const DateText_12_Right100_L16 = styled(DateText_12_Right100)`
  line-height: 16px;
`;
