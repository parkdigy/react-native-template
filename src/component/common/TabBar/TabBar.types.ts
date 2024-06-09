import {ReactElement} from 'react';
import {CustomComponentStyleProps} from '../CustomComponent';

export type TabBarItemValue = string | number;

export interface TabBarItem<T extends TabBarItemValue> {
  label: string;
  value: T;
  icon?: ReactElement;
  activeIcon?: ReactElement;
  disabled?: boolean;
}

export type TabBarItems<T extends TabBarItemValue> = TabBarItem<T>[];

export interface TabBarProps<T extends TabBarItemValue> extends Omit<CustomComponentStyleProps, 'row'> {
  mode?: 'default' | 'angled';
  items?: TabBarItems<T>;
  value?: T;
  onChange?(value: T): void;
}
