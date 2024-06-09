import styled from 'styled-components/native';
import {Text_12} from './Text.Size';

export const Text_BgPrimary: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.bgPrimary};
`;
export const Text_BgPrimary_W500: typeof Text = styled(Text_BgPrimary)`
  font-weight: 500;
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_BgPrimary: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.bgPrimary};
`;
export const Text_12_BgPrimary_W500: typeof Text = styled(Text_12_BgPrimary)`
  font-weight: 500;
`;
