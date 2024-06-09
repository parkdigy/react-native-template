import {ColorValue, GestureResponderEvent, ViewProps, ViewStyle} from 'react-native';

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
  trailingIconName?: string;
  trailingIconSize?: number;
  trailingIconColor?: ColorValue | number;
  skeleton?: boolean;
  onPress?(event: GestureResponderEvent): void;
}
