import {type AppListenerName, type AppListenerValue} from './app.types';

export function useAppListener<Name extends AppListenerName, Value = AppListenerValue<Name>>(name: Name): Value {
  const [value, setValue] = useState<Value>(app.getListenerValue(name));

  useEffect(() => {
    const handler = (newValue: Value) => {
      setValue(newValue);
    };
    app.addListener(name, handler);
    return () => app.removeListener(name, handler);
  }, [name]);

  return value;
}

export default useAppListener;
