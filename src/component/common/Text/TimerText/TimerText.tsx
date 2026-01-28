import {Text_Default} from '../Text';
import {type TimerTextProps as Props} from './TimerText.types';

const DEFAULT_LIMIT_SECONDS = 60 * 5;

const TimerText = ({startDate, limitSeconds, onLimitExceed, ...props}: Props) => {
  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const timerRef = useRef<number | undefined>(undefined);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [text, setText] = useState('');

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalLimitSeconds = useMemo(() => ifUndefined(limitSeconds, DEFAULT_LIMIT_SECONDS), [limitSeconds]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const makeText = useCallback((remainSeconds: number) => {
    if (remainSeconds <= 0) {
      setText('');
    } else {
      const min = `${Math.floor(remainSeconds / 60) + 100}`.substring(1);
      const sec = `${(remainSeconds % 60) + 100}`.substring(1);
      setText(`${min}:${sec}`);
    }
  }, []);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEventEffect(() => {
    const firstRemainSeconds = finalLimitSeconds - Math.floor((nowTime() - startDate.getTime()) / 1000);
    if (firstRemainSeconds > 0) {
      makeText(firstRemainSeconds);

      timerRef.current = setInterval(() => {
        const remainSeconds = finalLimitSeconds - Math.floor((nowTime() - startDate.getTime()) / 1000);
        if (remainSeconds <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = undefined;
          }

          makeText(remainSeconds);

          onLimitExceed?.();
        } else {
          makeText(remainSeconds);
        }
      }, 1000) as unknown as number;
    } else {
      makeText(firstRemainSeconds);
      onLimitExceed?.();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [finalLimitSeconds, startDate]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <Text_Default {...props}>{text}</Text_Default>;
};

export default TimerText;
