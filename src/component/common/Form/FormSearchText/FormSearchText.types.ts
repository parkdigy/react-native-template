import {type FormTextCommands, type FormTextProps} from '../FormText';

export interface FormSearchTextCommands extends FormTextCommands {}

export interface FormSearchTextProps extends Omit<FormTextProps, 'type' | 'right' | '$onGetCommands'> {
  ref?: Ref<FormSearchTextCommands>;
  onSubmit?(value: string | undefined, clear: boolean): void;
  hideClearSearch?: boolean;
  cancelButtonProps?: Omit<ButtonProps, 'children' | 'onPress'>;
  $onGetCommands?(commands: FormSearchTextCommands): FormSearchTextCommands;
}
