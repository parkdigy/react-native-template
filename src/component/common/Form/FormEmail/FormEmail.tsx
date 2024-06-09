import React from 'react';
import {FormTextCommands} from '../FormText';
import {FormEmailProps as Props, FormEmailCommands} from './FormEmail.types';

const VALID_PATTERN =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/g;

const FormEmail = React.forwardRef<FormEmailCommands, Props>(
  ({$controlType, type, validPattern, onValue, $onGetCommands, ...props}, ref) => {
    const handleGetCommands = useCallback(
      (baseCommands: FormTextCommands) => {
        let finalCommands: FormEmailCommands = {
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

    const handleValue = useCallback(
      (value: string | undefined) => {
        let finalValue = value;
        if (notEmpty(finalValue)) {
          finalValue = finalValue.replace(/[ ]/g, '');
        }
        if (onValue) {
          finalValue = onValue(finalValue);
        }
        return finalValue;
      },
      [onValue],
    );

    return (
      <FormText
        $controlType={ifUndefined($controlType, 'email')}
        type={ifUndefined(type, 'email')}
        validPattern={ifUndefined(validPattern, VALID_PATTERN)}
        invalidPatternErrorText='이메일 형식에 맞게 입력해주세요.'
        onValue={handleValue}
        $onGetCommands={handleGetCommands}
        {...props}
      />
    );
  },
);

export default FormEmail;
