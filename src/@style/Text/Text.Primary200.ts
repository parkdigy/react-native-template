import styled from 'styled-components/native';
import {Text_12, Text_16} from './Text.Size';

export const Text_Primary200: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary200};
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_Primary200: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary200};
`;
export const Text_12_Primary200_W500: typeof Text = styled(Text_12_Primary200)`
  font-weight: 500;
`;

/********************************************************************************************************************
 * 16
 * ******************************************************************************************************************/

export const Text_16_Primary200: typeof Text = styled(Text_16)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary200};
`;
export const Text_16_Primary200_W800: typeof Text = styled(Text_16_Primary200)`
  font-weight: 800;
`;
