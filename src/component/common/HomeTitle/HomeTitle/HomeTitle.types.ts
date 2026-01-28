import {type TopContainerViewProps} from '../../View';

export interface HomeTitleProps extends Omit<TopContainerViewProps, 'children' | 'right'> {
  children: ReactNode | string;
  right?: ReactNode;
  inTopContainer?: boolean;
}
