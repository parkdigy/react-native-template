import {FormTextCommands, FormTextProps} from '../FormText';

export interface FormTextareaCommands extends FormTextCommands {}

export interface FormTextareaProps extends Omit<FormTextProps, 'type' | 'multiline' | '$onGetCommands'> {
  $onGetCommands?(commands: FormTextareaCommands): FormTextareaCommands;
}
