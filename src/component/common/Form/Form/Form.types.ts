import React, {ReactNode} from 'react';
import {FormContextControl, FormContextControlWithName} from '../FormContext';
import {FormControlCommands} from '../FormControl';

export interface FormCommands {
  submit(): void;
  getControl<Commands extends FormControlCommands<unknown> = FormControlCommands<unknown>>(
    name: string,
  ): FormContextControl<Commands> | undefined;
  focus(name: string): void;
  getValue(name: string): unknown;
  getValues(): Dict;
  setError(name: string, error: string, focus?: boolean): void;
  validate(name: string, noSetError?: boolean): boolean;
}

export interface FormProps {
  children: ReactNode;
  parentScrollView?: React.RefObject<NativeScrollView>;
  flex?: number;
  onSubmit?(data: Dict): void;
  onSubmitError?(errorFormControls: FormContextControlWithName[]): void;
}
