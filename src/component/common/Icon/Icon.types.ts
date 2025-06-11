import VectorIcon from '@react-native-vector-icons/ionicons';
import {ComponentProps} from 'react';
import {ColorValue} from 'react-native';

type VectorIconProps = ComponentProps<typeof VectorIcon>;

export interface IconProps extends Omit<VectorIconProps, 'color'> {
  color?:
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
    | 'yellow'
    | ColorValue;
}
