import styled from 'styled-components/native';
import {Text_12, Text_13} from './Text.Size';

export const Text_Error: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.error};
`;
export const Text_Error_W500: typeof Text = styled(Text_Error)`
  font-weight: 500;
`;
export const Text_Error_W600: typeof Text = styled(Text_Error)`
  font-weight: 600;
`;
export const Text_Error_W700: typeof Text = styled(Text_Error)`
  font-weight: 700;
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_Error: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.error};
`;
export const Text_12_Error_W600: typeof Text = styled(Text_12_Error)`
  font-weight: 600;
`;
export const Text_12_Error_W300: typeof Text = styled(Text_12_Error)`
  font-weight: 300;
`;
export const Text_12_Error_L14: typeof Text = styled(Text_12_Error)`
  line-height: 14px;
`;

/********************************************************************************************************************
 * 13
 * ******************************************************************************************************************/

export const Text_13_Error: typeof Text = styled(Text_13)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.error};
`;
export const Text_13_Error_W700: typeof Text = styled(Text_13_Error)`
  font-weight: 700;
`;
export const Text_13_Error_W700_L17: typeof Text = styled(Text_13_Error_W700)`
  line-height: 17px;
`;
