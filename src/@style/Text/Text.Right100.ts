import styled from 'styled-components/native';
import {Text_11, Text_12, Text_13} from './Text.Size';

export const Text_Right100: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight100};
`;
export const Text_Right100_W300: typeof Text = styled(Text_Right100)`
  font-weight: 300;
`;
export const Text_Right100_W500: typeof Text = styled(Text_Right100)`
  font-weight: 500;
`;
export const Text_Right100_W600: typeof Text = styled(Text_Right100)`
  font-weight: 600;
`;
export const Text_Right100_L18: typeof Text = styled(Text_Right100)`
  line-height: 18px;
`;

/********************************************************************************************************************
 * 11
 * ******************************************************************************************************************/

export const Text_11_Right100: typeof Text = styled(Text_11)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight100};
`;
export const Text_11_Right200: typeof Text = styled(Text_11)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight200};
`;
export const Text_11_Error: typeof Text = styled(Text_11)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.error};
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_Right100: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight100};
`;
export const Text_12_Right100_W500: typeof Text = styled(Text_12_Right100)`
  font-weight: 500;
`;
export const Text_12_Right100_L16: typeof Text = styled(Text_12_Right100)`
  line-height: 16px;
`;

/********************************************************************************************************************
 * 13
 * ******************************************************************************************************************/

export const Text_13_Right100: typeof Text = styled(Text_13)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight100};
`;
export const Text_13_Right100_W500: typeof Text = styled(Text_13_Right100)`
  font-weight: 500;
`;
