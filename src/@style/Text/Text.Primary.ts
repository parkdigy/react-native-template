import styled from 'styled-components/native';
import {Text_12, Text_13, Text_16, Text_18} from './Text.Size';

export const Text_Primary: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary};
`;
export const Text_Primary_W500: typeof Text = styled(Text_Primary)`
  font-weight: 500;
`;
export const Text_Primary_W600: typeof Text = styled(Text_Primary)`
  font-weight: 600;
`;
export const Text_Primary_W600_L18: typeof Text = styled(Text_Primary_W600)`
  line-height: 18px;
`;
export const Text_Primary_W700: typeof Text = styled(Text_Primary)`
  font-weight: 700;
`;
export const Text_Primary_W800: typeof Text = styled(Text_Primary)`
  font-weight: 800;
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_Primary: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary};
`;
export const Text_12_Primary_W600: typeof Text = styled(Text_12_Primary)`
  font-weight: 600;
`;
export const Text_12_Primary_W800: typeof Text = styled(Text_12_Primary)`
  font-weight: 800;
`;

export const Text_12_Primary_W300: typeof Text = styled(Text_12_Primary)`
  font-weight: 300;
`;
export const Text_12_Primary_L14: typeof Text = styled(Text_12_Primary)`
  line-height: 14px;
`;
export const Text_12_Primary_L18: typeof Text = styled(Text_12_Primary)`
  line-height: 18px;
`;

/********************************************************************************************************************
 * 13
 * ******************************************************************************************************************/

export const Text_13_Primary: typeof Text = styled(Text_13)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary};
`;
export const Text_13_Primary_W700: typeof Text = styled(Text_13_Primary)`
  font-weight: 700;
`;
export const Text_13_Primary_W700_L17: typeof Text = styled(Text_13_Primary_W700)`
  line-height: 17px;
`;

/********************************************************************************************************************
 * 16
 * ******************************************************************************************************************/

export const Text_16_Primary: typeof Text = styled(Text_16)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary};
`;
export const Text_16_Primary_W600: typeof Text = styled(Text_16_Primary)`
  font-weight: 600;
`;
export const Text_16_Primary_W600_L22: typeof Text = styled(Text_16_Primary_W600)`
  line-height: 22px;
`;
export const Text_16_Primary_W700: typeof Text = styled(Text_16_Primary)`
  font-weight: 700;
`;
export const Text_16_Primary_W800: typeof Text = styled(Text_16_Primary)`
  font-weight: 800;
`;

/********************************************************************************************************************
 * 18
 * ******************************************************************************************************************/

export const Text_18_Primary: typeof Text = styled(Text_18)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary};
`;
export const Text_18_Primary_W800: typeof Text = styled(Text_18_Primary)`
  font-weight: 800;
`;
