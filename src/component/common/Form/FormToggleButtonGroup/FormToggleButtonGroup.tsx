import React from 'react';
import {useFirstSkipEffect} from '@pdg/react-hook';
import {AutoTypeForwardRef, ToForwardRefExoticComponent} from '@types';
import {Text_Default} from '@style';
import FormControl, {FormControlCommands} from '../FormControl';
import {
  FormToggleButtonGroupProps,
  FormToggleButtonGroupValue,
  FormToggleButtonGroupCommands,
} from './FormToggleButtonGroup.types';

const FormToggleButtonGroup = ToForwardRefExoticComponent(
  AutoTypeForwardRef(function <
    T extends FormToggleButtonGroupValue,
    Multiple extends boolean = false,
    Value extends (Multiple extends false ? T : T[]) | undefined = (Multiple extends false ? T : T[]) | undefined,
  >(
    {
      $controlType,
      buttonType,
      multiple,
      multipleMinCount,
      multipleMaxCount,
      horizontal,
      disabled,
      error: initError,
      value: initValue,
      items,
      scrollViewContentPaddingHorizontal,
      onValidate,
      onChangeError,
      $onGetCommands,
      ...props
    }: FormToggleButtonGroupProps<T, Multiple>,
    ref: React.ForwardedRef<FormToggleButtonGroupCommands<T, Multiple>>,
  ) {
    type Props = FormToggleButtonGroupProps<T, Multiple>;

    /********************************************************************************************************************
     * Use
     * ******************************************************************************************************************/

    const theme = useTheme();

    /********************************************************************************************************************
     * Ref
     * ******************************************************************************************************************/

    const commandsRef = useRef<FormToggleButtonGroupCommands<T, Multiple>>();
    const scrollViewRef = useRef<NativeScrollView>(null);

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [value, setValue] = useState<Value>(initValue as Value);
    const [error, setError] = useState<Props['error']>(initError);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useFirstSkipEffect(() => {
      setValue(initValue as Value);
    }, [initValue]);

    useFirstSkipEffect(() => {
      setError(initError);
    }, [initError]);

    useFirstSkipEffect(() => {
      if (error !== false) {
        commandsRef.current?.validate();
      }
    }, [value, error]);

    /********************************************************************************************************************
     * Function
     * ******************************************************************************************************************/

    const toggleValue = useCallback(
      (v: T) => {
        if (multiple) {
          setValue((old) => {
            let newValue = (old ? [...(old as T[])] : []) as T[];
            if (newValue.includes(v)) {
              newValue = newValue.filter((newV) => v !== newV);
            } else {
              if (multipleMaxCount === undefined || newValue.length < multipleMaxCount) {
                newValue.push(v);
              }
            }
            return newValue as Value;
          });
        } else {
          setValue(v as unknown as Value);
        }
      },
      [multiple, multipleMaxCount],
    );

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleValidate = useCallback(
      (v: Value) => {
        if (multiple) {
          if (multipleMinCount !== undefined) {
            if (empty(v) || !Array.isArray(v) || v.length < multipleMinCount) {
              return `최소 ${multipleMinCount}개를 선택해주세요.`;
            }
          }
          if (multipleMaxCount !== undefined) {
            if (empty(v) || !Array.isArray(v) || v.length > multipleMaxCount) {
              return `최대 ${multipleMaxCount}개를 선택해주세요.`;
            }
          }
        }
        if (onValidate) {
          return onValidate(v);
        }
        return true;
      },
      [multiple, multipleMaxCount, multipleMinCount, onValidate],
    );

    const handleChangeError = useCallback(
      (newError: false | string) => {
        setError(newError);
        onChangeError?.(newError);
      },
      [onChangeError],
    );

    const handleGetCommands = useCallback(
      (baseCommands: FormControlCommands<Value>) => {
        let finalCommands: FormToggleButtonGroupCommands<T, Multiple> = {
          ...baseCommands,
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

        return finalCommands as FormControlCommands<Value>;
      },
      [$onGetCommands, ref],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <FormControl
        $controlType={ifUndefined($controlType, 'toggle_button_group')}
        component={
          items ? (
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={
                scrollViewContentPaddingHorizontal ? {paddingHorizontal: scrollViewContentPaddingHorizontal} : undefined
              }
              horizontal={!!horizontal}
              scrollEnabled={!!horizontal}
              showsHorizontalScrollIndicator={false}>
              <Stack row wrap={!horizontal} spacing={8} useFlexGap>
                {items.map((info) => {
                  let active: boolean;
                  if (Array.isArray(value)) {
                    active = value.includes(info.value);
                  } else {
                    active = (value as unknown as T) === info.value;
                  }

                  switch (buttonType) {
                    case 'chip':
                      return (
                        <TouchableOpacity
                          key={info.value}
                          ph={15}
                          pv={10}
                          opacity={disabled ? 0.5 : undefined}
                          backgroundColor={active ? theme.colors.primary : theme.colors.opacity05}
                          borderRadius={20}
                          onPress={disabled ? undefined : () => toggleValue(info.value)}>
                          <Text_Default
                            c={active ? theme.colors.onPrimary : theme.colors.textAccent}
                            w={active ? 600 : undefined}>
                            {info.label}
                          </Text_Default>
                        </TouchableOpacity>
                      );
                    default:
                      return (
                        <Button
                          key={info.value}
                          mode='text'
                          minWidth={0}
                          labelStyle={{marginVertical: 0, paddingVertical: 10}}
                          borderColor={
                            active ? theme.colors.primary : error ? theme.colors.error : theme.colors.primary500
                          }
                          opacity={disabled ? 0.5 : undefined}
                          borderWidth={1}
                          backgroundColor={active ? theme.colors.primary : theme.colors.surface}
                          borderRadius={10}
                          textColor={
                            active ? theme.colors.onPrimary : error ? theme.colors.error : theme.colors.primary100
                          }
                          onPress={disabled ? undefined : () => toggleValue(info.value)}>
                          {info.label}
                        </Button>
                      );
                  }
                })}
              </Stack>
            </ScrollView>
          ) : (
            <View />
          )
        }
        value={value}
        onValidate={handleValidate}
        onChangeError={handleChangeError}
        $onGetCommands={handleGetCommands}
        {...props}
      />
    );
  }),
);

export default FormToggleButtonGroup;
