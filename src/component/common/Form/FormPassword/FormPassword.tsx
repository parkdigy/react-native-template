import React from 'react';
import {useFirstSkipEffect} from '@pdg/react-hook';
import {Text_Default} from '@style';
import {FormTextCommands} from '../FormText';
import {FormPasswordProps as Props, FormPasswordCommands} from './FormPassword.types';

const FormPassword = React.forwardRef<FormPasswordCommands, Props>(
  (
    {
      $controlType,
      type,
      value: initValue,
      error: initError,
      formatAlphabet,
      formatNumeric,
      formatSpecialChar,
      formatLength,
      onChange,
      onValidate,
      onChangeError,
      $onGetCommands,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [value, setValue] = useState<Props['value']>(initValue);
    const [error, setError] = useState<Props['error']>(initError);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useFirstSkipEffect(() => {
      setError(initError);
    }, [initError]);

    useFirstSkipEffect(() => {
      setValue(initValue);
    }, [initValue]);

    /********************************************************************************************************************
     * Function
     * ******************************************************************************************************************/

    const getContainAlphabet = useCallback(
      (text: string | undefined) => !!text && new RegExp(/[A-Za-z]/i).test(text),
      [],
    );

    const getContainNumeric = useCallback((text: string | undefined) => !!text && new RegExp(/[0-9]/i).test(text), []);

    const getContainSpecialChar = useCallback(
      (text: string | undefined) => !!text && new RegExp(/[/\\[\]{}<>()`~+=₩@$!%*#?&^:;,.'"_-]/i).test(text),
      [],
    );

    const getIsOverLength = useCallback(
      (text: string | undefined, length: number) => !!text && text.length >= length,
      [],
    );

    /********************************************************************************************************************
     * Memo
     * ******************************************************************************************************************/

    const showFormat = useMemo(
      () => !!formatAlphabet || !!formatNumeric || !!formatSpecialChar || formatLength !== undefined,
      [formatAlphabet, formatLength, formatNumeric, formatSpecialChar],
    );

    const isContainAlphabet = useMemo(
      () => !!formatAlphabet && getContainAlphabet(value),
      [formatAlphabet, getContainAlphabet, value],
    );

    const isContainNumeric = useMemo(
      () => !!formatNumeric && getContainNumeric(value),
      [formatNumeric, getContainNumeric, value],
    );

    const isContainSpecialChar = useMemo(
      () => !!formatSpecialChar && getContainSpecialChar(value),
      [formatSpecialChar, getContainSpecialChar, value],
    );

    const isOverLength = useMemo(
      () => formatLength !== undefined && getIsOverLength(value, formatLength),
      [formatLength, getIsOverLength, value],
    );

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleGetCommands = useCallback(
      (baseCommands: FormTextCommands) => {
        let finalCommands: FormPasswordCommands = {
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

    const handleChange = useCallback(
      (v: Props['value']) => {
        setValue(v);
        onChange && onChange(v);
      },
      [onChange],
    );

    const handleValidate = useCallback(
      (v: Props['value']) => {
        if (
          (formatAlphabet && !getContainAlphabet(v)) ||
          (formatNumeric && !getContainNumeric(v)) ||
          (formatSpecialChar && !getContainSpecialChar(v)) ||
          (formatLength && !getIsOverLength(v, formatLength))
        ) {
          return '비밀번호 형식에 맞게 입력해주세요.';
        }
        if (onValidate) {
          return onValidate(v);
        }
        return true;
      },
      [
        formatAlphabet,
        formatLength,
        formatNumeric,
        formatSpecialChar,
        getContainAlphabet,
        getContainNumeric,
        getContainSpecialChar,
        getIsOverLength,
        onValidate,
      ],
    );

    const handleChangeError = useCallback(
      (newError: false | string) => {
        setError(newError);
        onChangeError && onChangeError(newError);
      },
      [onChangeError],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <FormText
        $controlType={ifUndefined($controlType, 'password')}
        type={ifUndefined(type, 'newPassword')}
        value={value}
        error={error}
        hideErrorText={showFormat}
        onChange={handleChange}
        onValidate={handleValidate}
        onChangeError={handleChangeError}
        $onGetCommands={handleGetCommands}
        {...props}>
        {showFormat && (
          <Stack row spacing={10} center mt={10} ml={3}>
            {formatAlphabet && (
              <Stack row spacing={4} center>
                <Icon
                  name='check-bold'
                  size={14}
                  color={
                    isContainAlphabet ? theme.colors.primary : error ? theme.colors.error : theme.colors.textRight200
                  }
                />
                <Text_Default s={13} w={500} color={isContainAlphabet ? 'primary' : error ? 'error' : 'right100'}>
                  영문
                </Text_Default>
              </Stack>
            )}
            {formatNumeric && (
              <Stack row spacing={4} center>
                <Icon
                  name='check-bold'
                  size={14}
                  color={
                    isContainAlphabet ? theme.colors.primary : error ? theme.colors.error : theme.colors.textRight200
                  }
                />
                <Text_Default s={13} w={500} color={isContainNumeric ? 'primary' : error ? 'error' : 'right100'}>
                  숫자
                </Text_Default>
              </Stack>
            )}
            {formatSpecialChar && (
              <Stack row spacing={4} center>
                <Icon
                  name='check-bold'
                  size={14}
                  color={
                    isContainAlphabet ? theme.colors.primary : error ? theme.colors.error : theme.colors.textRight200
                  }
                />
                <Text_Default s={12} w={500} color={isContainSpecialChar ? 'primary' : error ? 'error' : 'right100'}>
                  특수문자
                </Text_Default>
              </Stack>
            )}
            {formatLength !== undefined && (
              <Stack row spacing={4} center>
                <Icon
                  name='check-bold'
                  size={14}
                  color={
                    isContainAlphabet ? theme.colors.primary : error ? theme.colors.error : theme.colors.textRight200
                  }
                />
                <Text_Default s={13} w={500} color={isOverLength ? 'primary' : error ? 'error' : 'right100'}>
                  {formatLength}글자 이상
                </Text_Default>
              </Stack>
            )}
          </Stack>
        )}
      </FormText>
    );
  },
);

export default FormPassword;
