import {type LinkTextLink} from '../LinkText/LinkText.types';

export interface LinkTextGroupProps {
  groupId: string;
  links?: LinkTextLink[];
  children?: ReactNode;
}
