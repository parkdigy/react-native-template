import {type SectionListProps} from 'react-native';
import {LoadingStatus} from '@const';
import {type ApiFlatListProps} from '../ApiFlatList';

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
      | 'firstLoadDelay'
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
  ref?: Ref<ApiSectionListCommands<T>>;
  listPaddingHorizontal?: number;
  listMarginTop?: number;
  listMinHeight?: number;
  refreshControlOffset?: number;
  TopFixedComponent?: ReactElement;
  TopComponent?: ReactElement;
  TopFooterComponent?: ReactElement;
  ListFixedComponent?: ReactElement;
  renderListItem(item: T, index: number): ReactElement;
  onChangeLoadingStatus?(loadingStatus: LoadingStatus): void;
  onListHeight?(listHeight: number): void;
  onCommands?(commands: ApiSectionListCommands): void;
}
