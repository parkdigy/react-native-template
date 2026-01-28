import {type FormTextCommands, type FormTextProps} from '../FormText';

export interface FormNumberCommands extends FormTextCommands {}

export interface FormNumberProps extends Omit<FormTextProps, 'type' | '$onGetCommands'> {
  ref?: Ref<FormNumberCommands>;
  type?: 'numeric' | 'oneTimeCode';
  decimal?: boolean;
  thousandComma?: boolean;
  $onGetCommands?(commands: FormNumberCommands): FormNumberCommands;
}
