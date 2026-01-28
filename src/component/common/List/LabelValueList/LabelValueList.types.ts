import {type StackProps} from '../../Stack';

export interface LabelValueListItem {
  label: string | ReactElement;
  value: string | ReactElement;
}

export type LabelValueListItems = LabelValueListItem[];

export interface LabelValueListProps extends StackProps {
  labelWidth: number;
  size?: TextProps['size'];
  items?: LabelValueListItems;
}
