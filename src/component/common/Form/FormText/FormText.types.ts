import {type TextInputProps} from 'react-native-paper';
import {type CustomComponentStyleProps} from '../../CustomComponent';
import {type FormControlCommands, type FormControlProps} from '../FormControl';

export type FormTextValue = string;

export interface FormTextCommands extends FormControlCommands<FormTextValue> {
  setValue(value: FormTextValue | undefined): void;
}

export interface FormTextProps
  extends Omit<CustomComponentStyleProps, 'left' | 'right'>,
    Omit<FormControlProps<FormTextValue>, '$controlType' | 'component' | '$onGetCommands'>,
    PartialPick<FormControlProps<FormTextValue>, '$controlType'>,
    Omit<TextInputProps, 'ref' | 'onChangeText' | 'children' | 'error' | 'label' | 'onChange'>,
    Pick<
      TextProps,
      | 'size'
      | 'color'
      | 'fontFamily'
      | 'fontSize'
      | 'fontWeight'
      | 'fontStyle'
      | 'bold'
      | 'letterSpacing'
      | 'textDecorationLine'
      | 'textDecorationStyle'
      | 'textDecorationColor'
      | 'textShadowColor'
      | 'textShadowOffset'
      | 'textShadowRadius'
      | 'textTransform'
    > {
  ref?: Ref<FormTextCommands>;
  type?:
    | 'text'
    | 'userEmail'
    | 'email'
    | 'password'
    | 'newPassword'
    | 'name'
    | 'tel'
    | 'url'
    | 'numeric'
    | 'decimal'
    | 'search'
    | 'nickname'
    | 'oneTimeCode';
  mode?: 'outlined';
  children?: ReactElement | false | 0;
  disabled?: boolean;
  validPattern?: RegExp;
  invalidPattern?: RegExp;
  invalidPatternErrorText?: string;
  nextName?: string;
  forceTheme?: 'dark' | 'light';
  onValue?(value: FormTextValue | undefined): FormTextValue | undefined;
  $onGetCommands?(commands: FormTextCommands): FormTextCommands;
}
