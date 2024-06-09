import styled from 'styled-components/native';
import {Text_12, Text_13} from './Text.Size';

export const Text_Primary100: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary100};
`;
export const Text_Primary100_L20: typeof Text = styled(Text_Primary100)`
  line-height: 20px;
`;
export const Text_Primary100_W500: typeof Text = styled(Text_Primary100)`
  font-weight: 500;
`;

/********************************************************************************************************************
 * 12
 * ******************************************************************************************************************/

export const Text_12_Primary100: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary100};
`;
export const Text_12_Primary100_W600: typeof Text = styled(Text_12_Primary100)`
  font-weight: 600;
`;

/********************************************************************************************************************
 * 13
 * ******************************************************************************************************************/

export const Text_13_Primary100: typeof Text = styled(Text_13)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary100};
`;
export const Text_13_Primary100_W500: typeof Text = styled(Text_13_Primary100)`
  font-weight: 500;
`;
