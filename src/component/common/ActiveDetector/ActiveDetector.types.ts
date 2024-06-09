export interface ActiveDetectorProps {
  children?: ReactNode;
  onChange?(active: boolean, pastTime: number): void;
  onChangeInForeground?(active: boolean, pastTime: number): void;
  onActiveFromBackground?(pastTime: number): void;
  onAppInactive?(): void;
  onAppActiveFromInactive?(pastTime: number): void;
}
