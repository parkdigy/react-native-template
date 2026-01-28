import {type FlatListProps} from 'react-native';
import {LoadingStatus} from '@const';

export interface ApiFlatListItem {
  id: number | string;
}

export interface ApiFlatListCommands<T extends ApiFlatListItem = ApiFlatListItem> {
  reload(): void;
  refresh(): void;
  getLoadingStatus(): LoadingStatus;
  getList(): T[] | undefined;
  setList(list: T[] | undefined, loadingStatus: LoadingStatus): void;
  scrollToTop(animated?: boolean): void;
}

export interface ApiFlatListProps<T extends ApiFlatListItem>
  extends Omit<
    FlatListProps<T>,
    | 'data'
    | 'keyExtractor'
    | 'refreshing'
    | 'refreshControl'
    | 'onEndReached'
    | 'onScrollEndDrag'
    | 'ListFooterComponent'
    | 'ListFooterComponentStyle'
    | 'onRefresh'
  > {
  perPageListItemCount: number;
  firstLoadDelay?: number;
  loadDelay?: number;
  errorDelay?: number;
  emptyText?: string;
  emptyMinHeight?: number;
  parentHeight?: number;
  reloadListWhenActiveFromBackground?: boolean;
  reloadListWhenActiveFromLongTermDeActive?: boolean;
  refreshControlOffset?: number;
  disableRefresh?: boolean;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement<unknown> | null;
  renderLoading?(): ReactElement | null;
  onLoadList(
    lastId: number | string | undefined,
    currentListLength: number,
    loadingStatus: LoadingStatus,
  ): Promise<T[]>;
  onList?(list: T[] | undefined, loadingStatus: LoadingStatus): void;
  onChangeLoadingStatus?(loadingStatus: LoadingStatus): void;
  onCommands?(commands: ApiFlatListCommands): void;
  onReloadWhenActiveFromBackground?(): void;
  onReloadWhenActiveFromLongTermDeActive?(): void;
  onRefresh?(): void;
  onEmptyComponent?(): ReactElement | null;
}
