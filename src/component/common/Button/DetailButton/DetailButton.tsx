import React from 'react';
import {DetailButtonProps as Props} from './DetailButton.types';

export const DetailButton = ({children, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/
  //
  return (
    <Button mode='text' textColor={theme.colors.primary100} size={'sm'} textDecorationLine='underline' {...props}>
      {children || '자세히'}
    </Button>
  );
};

export default DetailButton;
