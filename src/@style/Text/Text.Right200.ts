import styled from 'styled-components/native';
import {Text_13} from './Text.Size';

export const Text_Right200: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight200};
`;

/********************************************************************************************************************
 * 13
 * ******************************************************************************************************************/

export const Text_13_Right200: typeof Text = styled(Text_13)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight200};
`;
export const Text_13_Right200_W700: typeof Text = styled(Text_13_Right200)`
  font-weight: 700;
`;
export const Text_13_Right200_W700_L17: typeof Text = styled(Text_13_Right200_W700)`
  line-height: 17px;
`;
