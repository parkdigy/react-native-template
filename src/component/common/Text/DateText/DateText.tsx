import React from 'react';
import dayjs from 'dayjs';
import {Text_Default} from '../Text';
import {DateTextProps as Props} from './DateText.types';

const DateText: React.FC<Props> = ({value, dateSeparator, time, ...props}) => {
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

DateText.displayName = 'DateText';

export default DateText;
