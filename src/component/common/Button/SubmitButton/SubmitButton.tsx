import React from 'react';
import {SubmitButtonProps as Props} from './SubmitButton.types';

export const SubmitButton = (props: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <Button size='xl' fontWeight='700' backgroundColor={theme.colors.primary} {...props} />;
};

export default SubmitButton;
