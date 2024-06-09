import {FormTextCommands, FormTextProps} from '../FormText';

export interface FormNumberCommands extends FormTextCommands {}

export interface FormNumberProps extends Omit<FormTextProps, 'type' | '$onGetCommands'> {
  type?: 'numeric' | 'oneTimeCode';
  decimal?: boolean;
  thousandComma?: boolean;
  $onGetCommands?(commands: FormNumberCommands): FormNumberCommands;
}
