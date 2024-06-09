export interface PanelItemProps extends Omit<ViewProps, 'children'> {
  icon?: string;
  iconSize?: number;
  indicator?: boolean;
  color?: string;
  children?: Exclude<ReactNode, 'number'>;
  value?: Exclude<ReactNode, 'number'>;
  onPress?(): void;
}
