import {type FormContextValue, useFormState} from '../FormContext';
import FormContextProvider from '../FormContextProvider';
import {type FormProps as Props, type FormCommands} from './Form.types';

const FormInner = ({ref, children, flex, onSubmit, onSubmitError}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {submit, getControl, focusControl, getControlValue, getControlValues, setErrorControl, validateControl} =
    useFormState() as FormContextValue;

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  useForwardRef(
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
};

const Form = ({children, parentScrollView, ...props}: Props) => {
  return (
    <FormContextProvider parentScrollView={parentScrollView}>
      <FormInner {...props}>{children}</FormInner>
    </FormContextProvider>
  );
};

export default Form;
