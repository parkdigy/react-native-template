export interface SlideFullScreenViewCommand {
  hide(): void;
}

export interface SlideFullScreenViewProps {
  animationType?: 'slide' | 'zoom' | 'fade';
  noAnimation?: boolean;
  children?: ReactNode;
  show?: boolean;
  showClose?: boolean;
  closeColor?: string;
  backgroundColor?: string;
  overflow?: ViewProps['overflow'];
  safeArea?: boolean;
  preventBackClose?: boolean;
  onShown?(): void;
  onHidden?(): void;
  onRequestClose?(): void;
}
