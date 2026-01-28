import {type FormTextCommands, type FormTextProps} from '../FormText';

export type FormTelValue = string;

export interface FormTelCommands extends FormTextCommands {}

export interface FormTelProps extends Omit<FormTextProps, 'type' | '$onGetCommands'> {
  ref?: Ref<FormTelCommands>;
  $onGetCommands?(commands: FormTelCommands): FormTelCommands;
}
