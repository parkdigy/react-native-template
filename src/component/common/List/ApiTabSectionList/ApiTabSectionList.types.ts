import {ReactElement} from 'react';
import {LoadingStatus} from '@const';
import {ApiSectionListItem, ApiSectionListProps} from '../ApiSectionList';
import {TabBarItem, TabBarItemValue} from '../../TabBar';

export interface ApiTabSectionListTabItem<TAB extends TabBarItemValue> extends TabBarItem<TAB> {
  label: string;
  value: TAB;
  disabled?: boolean;
}

export type ApiTabSectionListTabItems<TAB extends TabBarItemValue> = ApiTabSectionListTabItem<TAB>[];

export interface ApiTabSectionListProps<T extends ApiSectionListItem, TAB extends TabBarItemValue>
  extends Omit<
    ApiSectionListProps<T>,
    'ListFixedComponent' | 'onLoadList' | 'onList' | 'onChangeLoadingStatus' | 'renderListItem' | 'renderLoading'
  > {
  tab: TAB;
  tabItems: ApiTabSectionListTabItems<TAB>;
  renderListItem(tab: TAB, item: T, index: number): ReactElement;
  renderLoading?(tab: TAB): ReactElement | null;
  onChangeTab?(tab: TAB): void;
  onLoadList(tab: TAB, lastId?: number): Promise<T[]>;
  onList?(tab: TAB, list: T[] | undefined, loadingStatus: LoadingStatus): void;
  onChangeLoadingStatus?(tab: TAB, loadingStatus: LoadingStatus): void;
}
