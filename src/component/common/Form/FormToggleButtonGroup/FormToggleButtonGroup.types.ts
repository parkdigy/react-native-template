import {type FormControlCommands, type FormControlProps} from '../FormControl';

export type FormToggleButtonGroupValue = string | number;

export interface FormToggleButtonGroupCommands<
  T extends FormToggleButtonGroupValue,
  Multiple extends boolean = false,
  Value extends (Multiple extends false ? T : T[]) | undefined = (Multiple extends false ? T : T[]) | undefined,
> extends FormControlCommands<Value> {}

export interface FormToggleButtonGroupItem<T extends FormToggleButtonGroupValue> {
  label: string;
  value: T;
}

export type FormToggleButtonGroupItems<T extends FormToggleButtonGroupValue> = FormToggleButtonGroupItem<T>[];

export interface FormToggleButtonGroupProps<
  T extends FormToggleButtonGroupValue,
  Multiple extends boolean = false,
  Value extends (Multiple extends false ? T : T[]) | undefined = (Multiple extends false ? T : T[]) | undefined,
> extends Omit<FormControlProps<Value>, '$controlType' | 'component' | '$onGetCommands'>,
    PartialPick<FormControlProps<Value>, '$controlType'> {
  ref?: Ref<FormToggleButtonGroupCommands<T, Multiple>>;
  buttonType?: 'default' | 'chip';
  multiple?: Multiple;
  multipleMinCount?: number;
  multipleMaxCount?: number;
  disabled?: boolean;
  items?: FormToggleButtonGroupItems<T>;
  horizontal?: boolean;
  scrollViewContentPaddingHorizontal?: number;
  $onGetCommands?(commands: FormToggleButtonGroupCommands<T, Multiple>): FormToggleButtonGroupCommands<T, Multiple>;
}
