import {type SegmentedButtonsProps} from 'react-native-paper';

export type FormSegmentProps = SegmentedButtonsProps & {
  outlineWidth?: number;
  outlineColor?: string;
  disabled?: boolean;
};
