import {type ValueListProps} from '../ValueList';
import {type IconProps} from '../../Icon';

export interface BulletValueListProps extends Omit<ValueListProps, 'label'> {
  bulletProps?: Omit<IconProps, 'name'>;
}
