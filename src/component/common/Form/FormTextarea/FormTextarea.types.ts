import {type FormTextCommands, type FormTextProps} from '../FormText';

export interface FormTextareaCommands extends FormTextCommands {}

export interface FormTextareaProps extends Omit<FormTextProps, 'type' | 'multiline' | '$onGetCommands'> {
  ref?: Ref<FormTextareaCommands>;
  $onGetCommands?(commands: FormTextareaCommands): FormTextareaCommands;
}
