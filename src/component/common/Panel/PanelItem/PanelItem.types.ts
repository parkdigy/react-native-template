import React from 'react';

export interface PanelItemProps extends Omit<ViewProps, 'children'> {
  icon?: string | React.JSX.Element;
  iconSize?: number;
  iconColor?: string;
  indicator?: boolean;
  color?: string;
  disabled?: boolean;
  children?: Exclude<ReactNode, 'number'>;
  title?: Exclude<ReactNode, 'string'>;
  subTitle?: Exclude<ReactNode, 'string'>;
  subTitleOpacity?: number;
  value?: Exclude<ReactNode, 'number'>;
  onPress?(): void;
}
