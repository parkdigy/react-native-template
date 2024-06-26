export interface PanelItemProps extends Omit<ViewProps, 'children'> {
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  indicator?: boolean;
  color?: string;
  disabled?: boolean;
  children?: Exclude<ReactNode, 'number'>;
  title?: Exclude<ReactNode, 'string'>;
  subTitle?: Exclude<ReactNode, 'string'>;
  value?: Exclude<ReactNode, 'number'>;
  onPress?(): void;
}
