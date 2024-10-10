import React from 'react';
import {NativeSyntheticEvent, TextInputFocusEventData, TextInputSubmitEditingEventData} from 'react-native';
import FormText, {FormTextCommands} from '../FormText';
import {FormSearchTextProps as Props, FormSearchTextCommands} from './FormSearchText.types';

const FormSearchText = React.forwardRef<FormSearchTextCommands, Props>(
  (
    {
      $controlType,
      value: initValue,
      hideClearSearch,
      cancelButtonProps,
      onFocus,
      onBlur,
      onChange,
      onSubmit,
      onSubmitEditing,
      $onGetCommands,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [value, setValue] = useState(initValue);
    const [focused, setFocused] = useState(false);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useEffect(() => {
      setValue(initValue);
    }, [initValue]);

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleSubmitEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        onSubmitEditing?.(e);
        onSubmit?.(value, false);
      },
      [onSubmit, onSubmitEditing, value],
    );

    const handleChange = useCallback(
      (text: string) => {
        setValue(text);
        onChange?.(text);
      },
      [onChange],
    );

    const handleClearPress = useCallback(() => {
      setValue('');
      onChange?.('');
      nextTick(() => {
        onSubmit?.('', true);
      });
    }, [onChange, onSubmit]);

    /********************************************************************************************************************
     * Commands
     * ******************************************************************************************************************/

    const handleGetCommands = useCallback(
      (baseCommands: FormTextCommands) => {
        let finalCommands: FormSearchTextCommands = {
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

        return finalCommands;
      },
      [$onGetCommands, ref],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <Stack row center flex={1}>
        <View flex={1}>
          <FormText
            $controlType={ifUndefined($controlType, 'search_text')}
            type='search'
            right={
              focused ? undefined /* <FormText.Icon icon={IconSearch} onPress={handleSubmitPress} style={{marginRight: -10}} /> */ : notEmpty(
                  value,
                ) && !hideClearSearch ? (
                <FormText.Icon forceTextInputFocus={false} icon={'close'} onPress={handleClearPress} style={{}} />
              ) : undefined
            }
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmitEditing}
            $onGetCommands={handleGetCommands}
            {...props}
          />
        </View>
        {focused && (
          <View ml={6}>
            <Button
              mode='text'
              style={{alignItems: 'center', minWidth: 0}}
              contentStyle={{flex: 1, flexDirection: 'column'}}
              labelStyle={{marginHorizontal: 18}}
              backgroundColor={theme.colors.opacity05}
              onPress={() => Keyboard.dismiss()}
              {...cancelButtonProps}>
              취소
            </Button>
          </View>
        )}
      </Stack>
    );
  },
);

export default FormSearchText;
