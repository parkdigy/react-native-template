import {useState} from 'react';
import {Text_Default} from '../../Text';
import {useFormState} from '../FormContext';
import {type FormControlProps as Props, type FormControlCommands} from './FormControl.types';

function FormControl<T extends unknown>({
  $controlType,
  component,
  name,
  value,
  label,
  labelHelperText,
  labelStyle,
  error: initError,
  hideErrorText,
  errorHelperTextColor,
  helperText,
  required,
  $onGetCommands,
  onChangeError,
  onValidate,
  onChange,
}: Props<T>) {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const formState = useFormState();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [container, setContainer] = useState<NativeView | null>(null);
  const [error, setError] = useState<boolean | string>(ifUndefined(initError, false));

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useFirstSkipEffect(() => {
    onChange?.(value);
  }, [value]);

  useFirstSkipEffect(() => {
    onChangeError?.(error);
  }, [error]);

  useFirstSkipEffect(() => {
    setError(ifUndefined(initError, false));
  }, [initError]);

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  const commands: FormControlCommands<T> = useMemo(() => {
    const baseCommands = {
      getContainer() {
        return container;
      },
      validate(noSetError?: boolean) {
        if (required && empty(value)) {
          if (!noSetError) {
            setError('필수 입력 항목입니다.');
          }
          return false;
        }

        if (onValidate) {
          const validateResult = onValidate(value);
          if (validateResult !== true) {
            if (!noSetError) {
              setError(validateResult);
            }
            return false;
          }
        }

        if (!noSetError) {
          setError(false);
        }
        return true;
      },
      focus() {},
      getValue() {
        return value;
      },
      setError(newError: string) {
        setError(newError);
      },
    };
    if ($onGetCommands) {
      return $onGetCommands(baseCommands);
    } else {
      return baseCommands;
    }
  }, [$onGetCommands, container, onValidate, required, value]);

  useEffect(() => {
    formState?.addControl(name, $controlType, commands);

    return () => {
      formState?.removeControl(name);
    };
  }, [formState, commands, name, $controlType]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View ref={(r) => setContainer(r)}>
      {label && (
        <View mb={10}>
          <Label required={required} error={error !== false} style={labelStyle}>
            {label}
          </Label>
          {labelHelperText && (
            <>
              {typeof labelHelperText === 'string' ? (
                <Text_Default s={12} mt={6}>
                  {labelHelperText}
                </Text_Default>
              ) : (
                labelHelperText
              )}
            </>
          )}
        </View>
      )}

      <View>{component}</View>
      {helperText && (
        <View mt={10} ml={3}>
          {typeof helperText === 'string' ? (
            <Text_Default
              s={12}
              c={error ? ifUndefined(errorHelperTextColor, theme.colors.error) : theme.colors.textRight200}>
              {helperText}
            </Text_Default>
          ) : (
            helperText
          )}
        </View>
      )}
      {error !== false && error !== true && notEmpty(error) && !hideErrorText && (
        <Stack mt={10} row center spacing={5}>
          <Icon
            name='information-circle-outline'
            size={14}
            color={ifUndefined(errorHelperTextColor, theme.colors.error)}
          />
          <Text_Default s={12} lh={14} c={ifUndefined(errorHelperTextColor, theme.colors.error)}>
            {error}
          </Text_Default>
        </Stack>
      )}
    </View>
  );
}

export default FormControl;
