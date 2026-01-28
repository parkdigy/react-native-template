import {type FormContextControl, type FormContextControlWithName} from '../FormContext';
import {type FormControlCommands} from '../FormControl';

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
  ref?: Ref<FormCommands>;
  children: ReactNode;
  parentScrollView?: React.RefObject<NativeScrollView | null>;
  flex?: number;
  onSubmit?(data: Dict): void;
  onSubmitError?(errorFormControls: FormContextControlWithName[]): void;
}
