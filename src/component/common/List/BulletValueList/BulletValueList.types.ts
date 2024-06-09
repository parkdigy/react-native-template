import {ValueListProps} from '../ValueList';
import {IconProps} from '../../Icon';

export interface BulletValueListProps extends Omit<ValueListProps, 'label'> {
  bulletProps?: Omit<IconProps, 'name'>;
}
