import styled from 'styled-components/native';
import {Text_12} from './Text.Size';

export const Text_Green400: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.green400};
`;
export const Text_Green400_W800: typeof Text = styled(Text_Green400)`
  font-weight: 800;
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_Green400: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.green400};
`;

export const Text_12_Green400_W600: typeof Text = styled(Text_12_Green400)`
  font-weight: 600;
`;
