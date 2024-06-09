import {FormTextCommands, FormTextProps} from '../FormText';

export interface FormSearchTextCommands extends FormTextCommands {}

export interface FormSearchTextProps extends Omit<FormTextProps, 'type' | 'right' | '$onGetCommands'> {
  onSubmit?(value: string | undefined, clear: boolean): void;
  hideClearSearch?: boolean;
  cancelButtonProps?: Omit<ButtonProps, 'children' | 'onPress'>;
  $onGetCommands?(commands: FormSearchTextCommands): FormSearchTextCommands;
}
