import React from 'react';

export interface PanelProps extends ViewProps {
  titleIcon?: React.JSX.Element;
  title?: string;
  titleProps?: Omit<TextProps, 'children'>;
  itemPadding?: ViewProps['p'];
  flat?: boolean;
  moreTitle?: string;
  hideMoreIndicator?: boolean;
  gradientBorderWidth?: number;
  onMorePress?(): void;
}
