import {IconProps as VectorIconProps} from 'react-native-vector-icons/Icon';

export interface IconProps extends Omit<VectorIconProps, 'color'> {
  color?:
    | VectorIconProps['color']
    | 'primary'
    | 'primary100'
    | 'primary200'
    | 'primary300'
    | 'primary400'
    | 'primary500'
    | 'primaryAccent'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'blueGray'
    | 'accent'
    | 'right100'
    | 'right200'
    | 'green100'
    | 'green200'
    | 'green300'
    | 'green400'
    | 'yellow';
}
