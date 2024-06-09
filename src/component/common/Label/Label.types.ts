import {ViewProps} from '../View';

export interface LabelProps extends Omit<ViewProps, 'children'> {
  children?: string;
  required?: boolean;
  error?: boolean;
}
