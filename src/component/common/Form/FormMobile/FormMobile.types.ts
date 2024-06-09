import {FormTelCommands, FormTelProps} from '../FormTel';

export interface FormMobileCommands extends FormTelCommands {}

export interface FormMobileProps extends Omit<FormTelProps, '$onGetCommands'> {
  $onGetCommands?(commands: FormMobileCommands): FormMobileCommands;
}
