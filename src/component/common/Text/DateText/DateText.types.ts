import {Dayjs} from 'dayjs';

export interface DateTextProps extends Omit<TextProps, 'children'> {
  value: string | Dayjs;
  time?: boolean;
  dateSeparator?: string;
}
