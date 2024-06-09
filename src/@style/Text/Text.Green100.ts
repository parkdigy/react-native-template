import styled from 'styled-components/native';
import {Text_13, Text_16} from './Text.Size';

export const Text_Green100: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.green100};
`;

/********************************************************************************************************************
 * 13
 * ******************************************************************************************************************/

export const Text_13_Green100: typeof Text = styled(Text_13)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.green100};
`;
export const Text_13_Green100_W500: typeof Text = styled(Text_13_Green100)`
  font-weight: 500;
`;

/********************************************************************************************************************
 * 16
 * ******************************************************************************************************************/

export const Text_16_Green100: typeof Text = styled(Text_16)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.green100};
`;
export const Text_16_Green100_W700: typeof Text = styled(Text_16_Green100)`
  font-weight: 700;
`;
