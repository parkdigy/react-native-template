import {type SubmitButtonProps as Props} from './SubmitButton.types';

export const SubmitButton = (props: Props) => {
  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <Button size='xl' {...props} />;
};

export default SubmitButton;
