export interface ApiInfoViewCommands {
  reload(): void;
}

export interface ApiInfoViewProps<T = any> extends Omit<ViewProps, 'children'> {
  loadDelay?: number;
  renderInfo(info: T): ReactNode;
  onLoadInfo(): Promise<T>;
  renderLoading?(): ReactNode;
  renderError?(retryCallback: () => void): ReactNode;
}
