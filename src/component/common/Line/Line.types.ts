import {ViewStyle} from 'react-native';

export interface LineProps
  extends PartialPick<
    ViewStyle,
    'width' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginHorizontal' | 'marginVertical'
  > {
  height?: ViewStyle['borderTopWidth'];
  color?: ViewStyle['borderTopColor'];
  style?: ViewStyle;
}
