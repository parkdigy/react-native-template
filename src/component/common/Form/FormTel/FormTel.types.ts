import {FormTextCommands, FormTextProps} from '../FormText';

export type FormTelValue = string;

export interface FormTelCommands extends FormTextCommands {}

export interface FormTelProps extends Omit<FormTextProps, 'type' | '$onGetCommands'> {
  $onGetCommands?(commands: FormTelCommands): FormTelCommands;
}
