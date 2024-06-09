import styled from 'styled-components/native';
import {Text_11, Text_13, Text_18} from './Text.Size';

export const Text_White: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.white};
`;
export const Text_White_W600: typeof Text = styled(Text_White)`
  font-weight: 600;
`;
export const Text_White_W700: typeof Text = styled(Text_White)`
  font-weight: 700;
`;

/********************************************************************************************************************
 * 11
 * ******************************************************************************************************************/

export const Text_11_White: typeof Text = styled(Text_11)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.white};
`;

/********************************************************************************************************************
 * 13
 * ******************************************************************************************************************/

export const Text_13_White: typeof Text = styled(Text_13)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.white};
`;
export const Text_13_White_W500: typeof Text = styled(Text_13_White)`
  font-weight: 500;
`;

/********************************************************************************************************************
 * 18
 * ******************************************************************************************************************/

export const Text_18_White: typeof Text = styled(Text_18)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.white};
`;
export const Text_18_White_W900: typeof Text = styled(Text_18_White)`
  font-weight: 900;
`;
