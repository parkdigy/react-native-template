import React from 'react';
import {telNoAutoDash} from '@pdg/util';
import {FormTextCommands} from '../FormText';
import {FormTelProps as Props, FormTelCommands, FormTelValue} from './FormTel.types';

const VALID_PATTERN =
  /(^([0-9]{2,3})([0-9]{3,4})([0-9]{4})$)|(^([0-9]{2,3})-([0-9]{3,4})-([0-9]{4})$)|(^([0-9]{4})-([0-9]{4})$)|(^\+(?:[-]?[0-9]){8,}$)/;

const FormTel = React.forwardRef<FormTelCommands, Props>(
  ({validPattern, $controlType, $onGetCommands, onValue, ...props}, ref) => {
    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleGetCommands = useCallback(
      (baseCommands: FormTextCommands) => {
        let finalCommands: FormTelCommands = {
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
      (value: FormTelValue | undefined) => {
        const newValue = notEmpty(value) ? telNoAutoDash(value.replace(/[^0-9]/gi, '')) : value;
        return onValue ? onValue(newValue) : newValue;
      },
      [onValue],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <FormText
        type='tel'
        $controlType={ifUndefined($controlType, 'tel')}
        $onGetCommands={handleGetCommands}
        maxLength={13}
        validPattern={ifUndefined(validPattern, VALID_PATTERN)}
        onValue={handleValue}
        {...props}
      />
    );
  },
);

export default FormTel;
