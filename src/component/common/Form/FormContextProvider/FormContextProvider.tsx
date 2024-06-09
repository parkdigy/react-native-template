import React from 'react';
import {FormContext, FormContextControl, FormContextControlWithName, FormContextValue} from '../FormContext';
import {FormControlCommands, FormControlType} from '../FormControl';
import {FormContextProviderProps as Props} from './FormContextProvider.types';

const FormContextProvider = ({children, parentScrollView}: Props) => {
  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const controlsRef = useRef<Dict<FormContextControl>>({});

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const getFinalValue = useCallback((type: FormControlType, value: unknown) => {
    switch (type) {
      case 'number':
        return notEmpty(value) && typeof value === 'string' ? value.replace(/[^0-9.]/g, '') : value;
      default:
        return value;
    }
  }, []);

  const addControl = useCallback((name: string, type: FormControlType, commands: FormControlCommands<unknown>) => {
    controlsRef.current[name] = {type, commands};
  }, []);

  const removeControl = useCallback((name: string) => {
    delete controlsRef.current[name];
  }, []);

  const getControl = useCallback(function <
    Commands extends FormControlCommands<unknown> = FormControlCommands<unknown>,
  >(name: string) {
    return controlsRef.current[name] as FormContextControlWithName<Commands>;
  }, []);

  const getControlValue = useCallback((name: string): unknown => {
    return controlsRef.current[name]?.commands?.getValue();
  }, []);

  const getControlValues = useCallback(() => {
    const values: Dict = {};

    Object.keys(controlsRef.current).forEach((key) => {
      const {type, commands} = controlsRef.current[key];
      values[key] = getFinalValue(type, commands.getValue());
    });

    return values;
  }, [getFinalValue]);

  const focusControl = useCallback(
    (name: string) => {
      if (controlsRef.current[name]) {
        const {commands} = controlsRef.current[name];
        if (parentScrollView?.current) {
          commands.focus();
          commands.getContainer()?.measureLayout(parentScrollView?.current as any, (x, y) => {
            parentScrollView?.current?.scrollTo({x: 0, y: y - 16, animated: true});
          });
        } else {
          commands.focus();
        }
      }
    },
    [parentScrollView],
  );

  const submit = useCallback(
    (error?: (errorFormControls: FormContextControlWithName[]) => void) => {
      let isValid = true;
      let isFocus = true;

      const values: Dict = {};
      const errorControls: FormContextControlWithName[] = [];

      Object.keys(controlsRef.current).forEach((key) => {
        const {type, commands} = controlsRef.current[key];
        values[key] = getFinalValue(type, commands.getValue());
        if (!commands.validate()) {
          errorControls.push({name: key, type, commands});

          if (isFocus) {
            focusControl(key);
            isFocus = false;
          }
          isValid = false;
        }
      });

      if (!isValid && error) {
        error(errorControls);
      }

      return isValid ? values : false;
    },
    [focusControl, getFinalValue],
  );

  const setErrorControl = useCallback(
    (name: string, error: string, focus?: boolean) => {
      if (controlsRef.current[name]) {
        controlsRef.current[name].commands.setError(error);
        if (focus) {
          focusControl(name);
        }
      }
    },
    [focusControl],
  );

  const validateControl = useCallback((name: string, noSetError?: boolean) => {
    if (controlsRef.current[name]) {
      return controlsRef.current[name].commands.validate(noSetError);
    } else {
      return true;
    }
  }, []);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const contextValue: FormContextValue = useMemo(
    () => ({
      focusControl,
      getControlValue,
      getControlValues,
      addControl,
      removeControl,
      getControl,
      setErrorControl,
      submit,
      validateControl,
    }),
    [
      addControl,
      focusControl,
      getControl,
      getControlValue,
      getControlValues,
      removeControl,
      setErrorControl,
      submit,
      validateControl,
    ],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

export default FormContextProvider;
