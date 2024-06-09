import {FormTextCommands, FormTextProps} from '../FormText';

export interface FormPasswordCommands extends FormTextCommands {}

export interface FormPasswordProps extends Omit<FormTextProps, 'type' | '$onGetCommands'> {
  type?: 'password' | 'newPassword';
  formatAlphabet?: boolean;
  formatNumeric?: boolean;
  formatSpecialChar?: boolean;
  formatLength?: number;
  $onGetCommands?(commands: FormPasswordCommands): FormPasswordCommands;
}
