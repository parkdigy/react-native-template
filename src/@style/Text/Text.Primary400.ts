import styled from 'styled-components/native';
import {Text_12} from './Text.Size';

export const Text_Primary400: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary400};
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_Primary400: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary400};
`;
