import {GestureResponderEvent} from 'react-native';
import {FormControlCommands, FormControlProps} from '../FormControl';

export type FormSelectValue = string | number;

export interface FormSelectCommands extends FormControlCommands<FormSelectValue> {}

export interface FormSelectProps
  extends Omit<FormControlProps<FormSelectValue>, '$controlType' | 'component' | '$onGetCommands'>,
    PartialPick<FormControlProps<FormSelectValue>, '$controlType'> {
  placeholder?: string;
  text?: string;
  onPress?(event: GestureResponderEvent): void;
  $onGetCommands?(commands: FormSelectCommands): FormSelectCommands;
}
