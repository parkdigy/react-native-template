import {type FormTextCommands, type FormTextProps} from '../FormText';

export interface FormEmailCommands extends FormTextCommands {}

export interface FormEmailProps extends Omit<FormTextProps, 'type' | '$onGetCommands'> {
  ref?: Ref<FormEmailCommands>;
  type?: 'email' | 'userEmail';
  $onGetCommands?(commands: FormEmailCommands): FormEmailCommands;
}
