import {type FormTelCommands, type FormTelProps} from '../FormTel';

export interface FormMobileCommands extends FormTelCommands {}

export interface FormMobileProps extends Omit<FormTelProps, '$onGetCommands'> {
  ref?: Ref<FormMobileCommands>;
  $onGetCommands?(commands: FormMobileCommands): FormMobileCommands;
}
