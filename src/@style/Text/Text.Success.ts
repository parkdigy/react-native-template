import styled from 'styled-components/native';
import {Text_12} from './Text.Size';

export const Text_Success: typeof Text = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.success};
`;
export const Text_12_Success: typeof Text = styled(Text_12)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.success};
`;
