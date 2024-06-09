import styled from 'styled-components/native';
import {Text_12} from './Text.Size';

export const Text_PrimaryAccent: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primaryAccent};
`;
export const Text_PrimaryAccent_W500: typeof Text = styled(Text_PrimaryAccent)`
  font-weight: 500;
`;
export const Text_PrimaryAccent_W600: typeof Text = styled(Text_PrimaryAccent)`
  font-weight: 600;
`;
export const Text_PrimaryAccent_W700: typeof Text = styled(Text_PrimaryAccent)`
  font-weight: 700;
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_PrimaryAccent: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primaryAccent};
`;
export const Text_12_PrimaryAccent_W600: typeof Text = styled(Text_12_PrimaryAccent)`
  font-weight: 600;
`;
