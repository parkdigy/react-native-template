import {type GestureResponderEvent, type ViewProps, type ViewStyle} from 'react-native';
import {type IconProps} from '../../Icon';

export interface ListViewItemProps
  extends Pick<
    ViewStyle,
    | 'padding'
    | 'paddingBottom'
    | 'paddingEnd'
    | 'paddingHorizontal'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingStart'
    | 'paddingTop'
    | 'paddingVertical'
  > {
  children: ViewProps['children'];
  activeOpacity?: number;
  trailingText?: string;
  trailingIcon?: boolean;
  trailingIconName?: IconProps['name'];
  trailingIconSize?: IconProps['size'];
  trailingIconColor?: IconProps['color'];
  skeleton?: boolean;
  onPress?(event: GestureResponderEvent): void;
}
