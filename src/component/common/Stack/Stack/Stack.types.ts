import {ViewProps} from 'react-native';
import {CustomComponentStyleProps} from '../../CustomComponent';

export interface StackProps extends Omit<ViewProps, 'children'>, CustomComponentStyleProps {
  children?: ReactNode;
  spacing?: number;
  row?: boolean;
  wrap?: boolean;
  useFlexGap?: boolean;
  center?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
  fullWidth?: boolean;
}
