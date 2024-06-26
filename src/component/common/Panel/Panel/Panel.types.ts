export interface PanelProps extends ViewProps {
  title?: string;
  titleProps?: Omit<TextProps, 'children'>;
  itemPadding?: ViewProps['p'];
  flat?: boolean;
  moreTitle?: string;
  onMorePress?(): void;
}
