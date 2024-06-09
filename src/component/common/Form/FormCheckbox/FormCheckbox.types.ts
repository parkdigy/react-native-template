import {ReactElement} from 'react';
import {FormControlCommands, FormControlProps} from '../FormControl';

export type FormCheckboxValue = boolean;

export interface FormCheckboxCommands extends FormControlCommands<FormCheckboxValue> {
  getChecked(): boolean;
}

export interface FormCheckboxProps
  extends Omit<
      FormControlProps<FormCheckboxValue>,
      | '$controlType'
      | 'component'
      | 'label'
      | 'labelStyle'
      | 'labelHelperText'
      | 'required'
      | 'value'
      | '$onGetCommands'
      | 'onValidate'
      | 'onChange'
    >,
    PartialPick<FormControlProps<FormCheckboxValue>, '$controlType'> {
  children?: string | ReactElement;
  checked?: boolean;
  disabled?: boolean;
  onChange?(checked: boolean): void;
  onValidate?(checked: boolean): true | string;
  $onGetCommands?(commands: FormCheckboxCommands): FormCheckboxCommands;
}
