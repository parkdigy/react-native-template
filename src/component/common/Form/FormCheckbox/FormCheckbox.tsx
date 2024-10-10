import React from 'react';
import {Text_Default} from '@style';
import FormControl, {FormControlCommands} from '../FormControl';
import {FormCheckboxProps as Props, FormCheckboxCommands, FormCheckboxValue} from './FormCheckbox.types';

const FormCheckbox = React.forwardRef<FormCheckboxCommands, Props>(
  (
    {
      children,
      name,
      checked: initChecked,
      error: initError,
      hideErrorText,
      helperText,
      disabled,
      onChange,
      onChangeError,
      onValidate,
      $onGetCommands,
    },
    ref,
  ) => {
    /********************************************************************************************************************
     * Use
     * ******************************************************************************************************************/

    const theme = useTheme();

    /********************************************************************************************************************
     * Ref
     * ******************************************************************************************************************/

    const commandsRef = useRef<FormCheckboxCommands>();

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [checked, setChecked] = useState(!!initChecked);
    const [error, setError] = useState<Props['error']>(initError);

    /********************************************************************************************************************
     * Memo
     * ******************************************************************************************************************/

    const isError = useMemo(() => error !== undefined && error !== false, [error]);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useEffect(() => {
      setChecked(!!initChecked);
    }, [initChecked]);

    useEffect(() => {
      setError(initError);
    }, [initError]);

    /********************************************************************************************************************
     * Commands
     * ******************************************************************************************************************/

    const commands: Omit<
      FormCheckboxCommands,
      Exclude<keyof FormControlCommands<FormCheckboxValue>, 'getValue'>
    > = useMemo(
      () => ({
        getChecked: () => checked,
        getValue: () => checked,
      }),
      [checked],
    );

    const handleGetCommands = useCallback(
      (baseCommands: FormControlCommands<unknown>) => {
        let finalCommands: FormCheckboxCommands = {
          ...baseCommands,
          ...commands,
        };

        if ($onGetCommands) {
          finalCommands = $onGetCommands(finalCommands);
        }

        if (ref) {
          if (typeof ref === 'function') {
            ref(finalCommands);
          } else {
            ref.current = finalCommands;
          }
        }

        commandsRef.current = finalCommands;

        return finalCommands as unknown as FormControlCommands<unknown>;
      },
      [$onGetCommands, commands, ref],
    );

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handlePress = useCallback(() => {
      setChecked(!checked);
      onChange?.(!checked);
      if (isError) {
        commandsRef.current?.validate();
      }
    }, [checked, isError, onChange]);

    const handleChangeError = useCallback(
      (err: string | false) => {
        setError(err);
        onChangeError?.(err);
      },
      [onChangeError],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <View>
        <FormControl
          $controlType='checkbox'
          component={
            <Pressable disabled={disabled} style={{opacity: disabled ? 0.5 : undefined}} onPress={handlePress}>
              <Stack row center spacing={8} p={10}>
                <View
                  width={18}
                  height={18}
                  borderRadius={4}
                  borderWidth={checked ? undefined : 1.2}
                  borderColor={checked ? undefined : isError ? theme.colors.error : theme.colors.opacity20}
                  backgroundColor={
                    checked ? (isError ? theme.colors.error : theme.colors.primary) : theme.colors.surface
                  }
                  alignItems='center'
                  justifyContent='center'>
                  <Icon name='check-bold' size={15} color={theme.colors.bgPrimary} />
                </View>
                {typeof children === 'string' ? (
                  <Text_Default w={500} color={isError ? 'error' : 'accent'}>
                    {children}
                  </Text_Default>
                ) : (
                  children
                )}
              </Stack>
            </Pressable>
          }
          name={name}
          error={error}
          hideErrorText={hideErrorText}
          helperText={helperText}
          $onGetCommands={handleGetCommands}
          onChangeError={handleChangeError}
          onValidate={onValidate}
        />
      </View>
    );
  },
);

export default FormCheckbox;
