import {type FormControlCommands, type FormControlType} from '../FormControl';

export interface FormContextControl<Commands extends FormControlCommands<unknown> = FormControlCommands<unknown>> {
  type: FormControlType;
  commands: Commands;
}

export interface FormContextControlWithName<
  Commands extends FormControlCommands<unknown> = FormControlCommands<unknown>,
> extends FormContextControl<Commands> {
  name: string;
}

export type FormContextValue = {
  submit(error?: (errorFormControls: FormContextControlWithName[]) => void): false | Dict;
  addControl(name: string, type: FormControlType, commands: FormControlCommands<unknown>): void;
  removeControl(name: string): void;
  getControl<Commands extends FormControlCommands<unknown> = FormControlCommands<unknown>>(
    name: string,
  ): FormContextControl<Commands> | undefined;
  getControlValue(name: string): unknown;
  getControlValues(): Dict;
  focusControl(name: string): void;
  setErrorControl(name: string, error: string, focus?: boolean): void;
  validateControl(name: string, noSetError?: boolean): boolean;
};
