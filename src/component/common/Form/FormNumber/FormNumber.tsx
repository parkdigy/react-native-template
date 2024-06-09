import React from 'react';
import {FormTextCommands} from '../FormText';
import {FormNumberProps as Props, FormNumberCommands} from './FormNumber.types';

const FormNumber = React.forwardRef<FormNumberCommands, Props>(
  ({$controlType, type, decimal, thousandComma, onValue, $onGetCommands, ...props}, ref) => {
    const handleGetCommands = useCallback(
      (baseCommands: FormTextCommands) => {
        let finalCommands: FormNumberCommands = {
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
          if (decimal) {
            finalValue = finalValue.replace(/[^0-9.]/g, '');
          } else {
            finalValue = finalValue.replace(/[^0-9]/g, '');
          }

          if (thousandComma) {
            finalValue = finalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
        if (onValue) {
          finalValue = onValue(finalValue);
        }

        return finalValue;
      },
      [decimal, onValue, thousandComma],
    );

    return (
      <FormText
        $controlType={ifUndefined($controlType, 'number')}
        type={ifUndefined(type, 'numeric')}
        keyboardType={decimal ? 'decimal-pad' : 'number-pad'}
        onValue={handleValue}
        $onGetCommands={handleGetCommands}
        {...props}
      />
    );
  },
);

export default FormNumber;
