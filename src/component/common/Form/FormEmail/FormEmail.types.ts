import {FormTextCommands, FormTextProps} from '../FormText';

export interface FormEmailCommands extends FormTextCommands {}

export interface FormEmailProps extends Omit<FormTextProps, 'type' | '$onGetCommands'> {
  type?: 'email' | 'userEmail';
  $onGetCommands?(commands: FormEmailCommands): FormEmailCommands;
}
