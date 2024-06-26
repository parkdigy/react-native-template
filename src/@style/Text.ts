import styled from 'styled-components/native';

export const Text_Default = styled(Text)``;

export const Text_Accent = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textAccent};
`;

export const Text_Error = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.error};
`;

export const Text_Primary = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary};
`;

export const Text_Primary100 = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary100};
`;

export const Text_Primary200 = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary200};
`;

export const Text_Primary300 = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary300};
`;

export const Text_Primary400 = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primary400};
`;

export const Text_PrimaryAccent = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.primaryAccent};
`;

export const Text_Right100 = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight100};
`;

export const Text_Right200 = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.textRight200};
`;

export const Text_Success = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.success};
`;

export const Text_White = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.white};
`;

export const Text_Black = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.white};
`;

export const Text_Gray = styled(Text)`
  color: ${({theme}: StyledReactNativePaperTheme) => theme.colors.gray};
`;
