import {ReactElement} from 'react';

export interface InfoPanelItemProps extends Omit<ViewProps, 'children'> {
  children: string | ReactElement;
}
