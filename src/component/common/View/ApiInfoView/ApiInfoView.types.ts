export interface ApiInfoViewCommands {
  reload(): void;
}

export interface ApiInfoViewProps<T = any> extends Omit<ViewProps, 'children'> {
  firstLoadDelay?: number;
  loadDelay?: number;
  renderInfo(info: T): ReactNode;
  onLoadStart?(): void;
  onLoadEnd?(): void;
  onLoadInfo(): Promise<T>;
  renderLoading?(): ReactNode;
  renderError?(retryCallback: () => void): ReactNode;
}
