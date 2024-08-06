import {SectionListProps} from 'react-native';
import {ReactElement} from 'react';
import {LoadingStatus} from '@const';
import {ApiFlatListProps} from '../ApiFlatList';

export const ApiSectionListSection = {
  Header: 'header',
  List: 'list',
} as const;

export type ApiSectionListSection = ValueOf<typeof ApiSectionListSection>;

export interface ApiSectionListCommands<T extends ApiSectionListItem = ApiSectionListItem> {
  reloadList(): void;
  refreshList(): void;
  getLoadingStatus(): LoadingStatus;
  getList(): T[] | undefined;
  setList(list: T[] | undefined, loadingStatus: LoadingStatus): void;
  scrollToTop(animated?: boolean): void;
}

export interface ApiSectionListItem {
  id: number | string;
}

export interface ApiSectionListProps<T extends ApiSectionListItem>
  extends Omit<
      SectionListProps<T | undefined>,
      'sections' | 'renderItem' | 'renderSectionHeader' | 'renderSectionFooter'
    >,
    Pick<
      ApiFlatListProps<T>,
      | 'perPageListItemCount'
      | 'loadDelay'
      | 'disableRefresh'
      | 'errorDelay'
      | 'emptyText'
      | 'emptyMinHeight'
      | 'reloadListWhenActiveFromBackground'
      | 'reloadListWhenActiveFromLongTermDeActive'
      | 'renderLoading'
      | 'onLoadList'
      | 'onList'
      | 'onReloadWhenActiveFromBackground'
      | 'onReloadWhenActiveFromLongTermDeActive'
    > {
  listPaddingHorizontal?: number;
  listMarginTop?: number;
  listMinHeight?: number;
  TopFixedComponent?: ReactElement;
  TopComponent?: ReactElement;
  TopFooterComponent?: ReactElement;
  ListFixedComponent?: ReactElement;
  renderListItem(item: T, index: number): ReactElement;
  onChangeLoadingStatus?(loadingStatus: LoadingStatus): void;
  onCommands?(commands: ApiSectionListCommands): void;
}
