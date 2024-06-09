export interface TimerTextProps extends Omit<TextProps, 'children'> {
  startDate: Date;
  limitSeconds?: number;
  onLimitExceed?(): void;
}
