import dayjs from 'dayjs';
import {Text_Default} from '../Text';
import {type DateTextProps as Props} from './DateText.types';

const DateText = ({value, dateSeparator, time, ...props}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalDateSeparator = useMemo(() => ifUndefined(dateSeparator, '.'), [dateSeparator]);

  const format = useMemo(
    () => `YYYY${finalDateSeparator}MM${finalDateSeparator}DD${time ? ' HH:mm:ss' : ''}`,
    [finalDateSeparator, time],
  );

  const dateString = useMemo(() => dayjs(value).format(format), [format, value]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <Text_Default {...props}>{dateString}</Text_Default>;
};

export default DateText;
