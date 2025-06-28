import React from 'react';
import {FormContextValue, useFormState} from '../FormContext';
import FormContextProvider from '../FormContextProvider';
import {FormProps as Props, FormCommands} from './Form.types';
import {useForwardLayoutRef} from '@pdg/react-hook';

const FormInner = React.forwardRef<FormCommands, Props>(({children, flex, onSubmit, onSubmitError}, ref) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {submit, getControl, focusControl, getControlValue, getControlValues, setErrorControl, validateControl} =
    useFormState() as FormContextValue;

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  useForwardLayoutRef(
    ref,
    useMemo<FormCommands>(
      () => ({
        focus: focusControl,
        getControl,
        submit() {
          const submitResult = submit((errorFormControls) => {
            onSubmitError?.(errorFormControls);
          });
          if (submitResult) {
            Keyboard.dismiss();
            onSubmit?.(submitResult);
          }
        },
        getValue: getControlValue,
        getValues: getControlValues,
        setError: setErrorControl,
        validate: validateControl,
      }),
      [
        focusControl,
        getControl,
        getControlValue,
        getControlValues,
        onSubmit,
        onSubmitError,
        setErrorControl,
        submit,
        validateControl,
      ],
    ),
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <View flex={flex}>{children}</View>;
});

const Form = React.forwardRef<FormCommands, Props>(({children, parentScrollView, ...props}, ref) => {
  return (
    <FormContextProvider parentScrollView={parentScrollView}>
      <FormInner ref={ref} {...props}>
        {children}
      </FormInner>
    </FormContextProvider>
  );
});

Form.displayName = 'Form';

export default Form;
