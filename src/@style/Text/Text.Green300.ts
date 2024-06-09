import styled from 'styled-components/native';
import {Text_12} from './Text.Size';

export const Text_Green300: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.green300};
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_Green300: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.green300};
`;
export const Text_12_Green300_W700: typeof Text = styled(Text_12_Green300)`
  font-weight: 700;
`;
