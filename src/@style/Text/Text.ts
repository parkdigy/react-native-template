import styled from 'styled-components/native';

/********************************************************************************************************************
 * line-height
 * ******************************************************************************************************************/

export const Text_L16: typeof Text = styled(Text)`
  line-height: 16px;
`;
export const Text_L18: typeof Text = styled(Text)`
  line-height: 18px;
`;
export const Text_L22: typeof Text = styled(Text)`
  line-height: 22px;
`;

/********************************************************************************************************************
 * font-weight
 * ******************************************************************************************************************/

export const Text_W500: typeof Text = styled(Text)`
  font-weight: 500;
`;
export const Text_W600: typeof Text = styled(Text)`
  font-weight: 600;
`;
export const Text_W700: typeof Text = styled(Text)`
  font-weight: 700;
`;

export const Text_W800: typeof Text = styled(Text)`
  font-weight: 800;
`;

/********************************************************************************************************************
 * font-weight, line-height
 * ******************************************************************************************************************/

export const Text_W500_L18: typeof Text = styled(Text_W500)`
  line-height: 18px;
`;
export const Text_W500_L20: typeof Text = styled(Text_W500)`
  line-height: 20px;
`;
export const Text_W600_L18: typeof Text = styled(Text_W600)`
  line-height: 18px;
`;
export const Text_W600_L20: typeof Text = styled(Text_W600)`
  line-height: 20px;
`;
export const Text_W700_L20: typeof Text = styled(Text_W700)`
  line-height: 20px;
`;
export const Text_W800_L18: typeof Text = styled(Text_W800)`
  line-height: 18px;
`;
