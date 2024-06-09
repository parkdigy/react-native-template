import React from 'react';
import {RadioButtonProps as Props} from './RadioButton.types';

const RadioButton = ({active}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View
      width={24}
      height={24}
      borderWidth={active ? 9 : 2}
      borderColor={active ? theme.colors.primary : theme.colors.opacity20}
      borderRadius={12}
      backgroundColor={theme.colors.surface}
    />
  );
};

export default RadioButton;
