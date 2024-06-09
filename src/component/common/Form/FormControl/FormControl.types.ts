import {ReactElement} from 'react';
import {TextStyle} from 'react-native';

export type FormControlType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'password'
  | 'tel'
  | 'mobile'
  | 'number'
  | 'search_text'
  | 'segment'
  | 'select'
  | 'switch'
  | 'toggle_button_group'
  | 'checkbox'
  | 'bank';

export interface FormControlCommands<T extends unknown> {
  getContainer(): NativeView | null;
  focus(): void;
  validate(noSetError?: boolean): boolean;
  getValue(): T | undefined;
  setError(error: true | string): void;
}

export interface FormControlProps<T extends unknown> {
  $controlType: FormControlType;
  component: ReactElement;
  name: string;
  value?: T;
  label?: string;
  labelHelperText?: string | ReactElement;
  labelStyle?: TextStyle;
  required?: boolean;
  helperText?: string | ReactElement;
  error?: boolean | string;
  hideErrorText?: boolean;
  errorHelperTextColor?: string;
  $onGetCommands?(commands: FormControlCommands<T>): FormControlCommands<T>;
  onChange?(value: T | undefined): void;
  onChangeError?(error: boolean | string): void;
  onValidate?(value: T | undefined): true | string;
}
