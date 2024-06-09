import styled from 'styled-components/native';
import {Text_13} from './Text.Size';

export const Text_OnPurple: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.onPurple};
`;
export const Text_OnPurple_W600: typeof Text = styled(Text_OnPurple)`
  font-weight: 600;
`;
export const Text_OnPurple_W700: typeof Text = styled(Text_OnPurple)`
  font-weight: 700;
`;

/********************************************************************************************************************
 * 13
 * ******************************************************************************************************************/

export const Text_13_OnPurple: typeof Text = styled(Text_13)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.onPurple};
`;
export const Text_13_OnPurple_W500: typeof Text = styled(Text_13_OnPurple)`
  font-weight: 500;
`;
