import React from 'react';
import {FormTextCommands} from '../FormText';
import {FormTextareaProps as Props, FormTextareaCommands} from './FormTextarea.types';

const FormTextarea = React.forwardRef<FormTextareaCommands, Props>(
  ({height, $controlType, $onGetCommands, ...props}, ref) => {
    const handleGetCommands = useCallback(
      (baseCommands: FormTextCommands) => {
        let finalCommands: FormTextareaCommands = {
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

    return (
      <FormText
        type='text'
        $controlType={ifUndefined($controlType, 'textarea')}
        multiline
        height={ifUndefined(height, 100)}
        $onGetCommands={handleGetCommands}
        {...props}
      />
    );
  },
);

export default FormTextarea;
