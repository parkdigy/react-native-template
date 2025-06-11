import {ReactElement} from 'react';
import {StackProps} from '../../Stack';

export type ValueListItems = (string | ReactElement)[];

export interface ValueListProps extends Omit<StackProps, 'children'> {
  label?: ReactElement;
  valueTextProps?: Omit<TextProps, 'children'>;
  items?: ValueListItems;
  centerVertical?: boolean;
}
