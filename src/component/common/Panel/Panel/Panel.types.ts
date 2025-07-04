import React from 'react';
import {ColorButtonColors} from '../../Button';

export interface PanelProps extends ViewProps {
  titleIcon?: React.JSX.Element;
  title?: string;
  titleProps?: Omit<TextProps, 'children'>;
  itemPadding?: ViewProps['p'];
  flat?: boolean;
  moreTitle?: string;
  hideMoreIndicator?: boolean;
  gradientBorderColor?: ColorButtonColors;
  gradientBorderWidth?: number;
  onMorePress?(): void;
}
