import {Animated, type SectionListProps} from 'react-native';
import {LoadingStatus} from '@const';
import {type AnimatedApiFlatListProps} from '../AnimatedApiFlatList';

export const AnimatedApiSectionListSection = {
  Header: 'header',
  List: 'list',
} as const;

export type AnimatedApiSectionListSection = ValueOf<typeof AnimatedApiSectionListSection>;

export interface AnimatedApiSectionListCommands<T extends AnimatedApiSectionListItem = AnimatedApiSectionListItem> {
  reloadList(): void;
  refreshList(): void;
  getLoadingStatus(): LoadingStatus;
  getList(): T[] | undefined;
  setList(list: T[] | undefined, loadingStatus: LoadingStatus): void;
  scrollToTop(animated?: boolean): void;
}

export interface AnimatedApiSectionListItem {
  id: number | string;
}

export interface AnimatedApiSectionListProps<T extends AnimatedApiSectionListItem>
  extends Omit<
      Animated.AnimatedProps<SectionListProps<T | undefined>>,
      'sections' | 'renderItem' | 'renderSectionHeader' | 'renderSectionFooter'
    >,
    Pick<
      AnimatedApiFlatListProps<T>,
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
  onCommands?(commands: AnimatedApiSectionListCommands): void;
}
