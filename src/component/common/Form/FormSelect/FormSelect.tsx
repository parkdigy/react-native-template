import React from 'react';
import {useFirstSkipEffect} from '@pdg/react-hook';
import {Text_Accent, Text_Right100} from '../../Text';
import FormControl, {FormControlCommands} from '../FormControl';
import {FormSelectProps as Props, FormSelectCommands, FormSelectValue} from './FormSelect.types';

const FormSelect = React.forwardRef<FormSelectCommands, Props>(
  ({$controlType, error: initError, placeholder, text, onPress, onChangeError, $onGetCommands, ...props}, ref) => {
    const theme = useTheme();

    /********************************************************************************************************************
     * Ref
     * ******************************************************************************************************************/

    const commandsRef = useRef<FormSelectCommands>();

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [error, setError] = useState<Props['error']>(initError);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useFirstSkipEffect(() => {
      setError(initError);
    }, [initError]);

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleChangeError = useCallback(
      (newError: false | string) => {
        setError(newError);
        onChangeError?.(newError);
      },
      [onChangeError],
    );

    const handleGetCommands = useCallback(
      (baseCommands: FormControlCommands<FormSelectValue>) => {
        let finalCommands: FormSelectCommands = {
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

        return finalCommands as FormControlCommands<FormSelectValue>;
      },
      [$onGetCommands, ref],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <FormControl
        $controlType={ifUndefined($controlType, 'select')}
        component={
          <Pressable
            height={50}
            backgroundColor={theme.colors.surface}
            borderRadius={10}
            borderColor={error ? theme.colors.error : theme.colors.opacity10}
            borderWidth={error ? 2 : 1}
            justifyContent='center'
            pl={15}
            pr={20}
            onPress={onPress}>
            <Stack row center>
              <View flex={1} pr={10}>
                {text !== undefined ? (
                  <Text_Accent numberOfLines={1}>{text}</Text_Accent>
                ) : (
                  placeholder && <Text_Right100 numberOfLines={1}>{placeholder}</Text_Right100>
                )}
              </View>
              <View mr={-5}>
                <Icon name='chevron-down' size={22} color={error ? theme.colors.error : theme.colors.onSurface} />
              </View>
            </Stack>
          </Pressable>
        }
        onChangeError={handleChangeError}
        $onGetCommands={handleGetCommands}
        {...props}
      />
    );
  },
);

export default FormSelect;
