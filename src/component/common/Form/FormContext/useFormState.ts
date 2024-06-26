import {useContext} from 'react';
import {FormContext} from './FormContext';

export default function useFormState() {
  return useContext(FormContext);
}

export {useFormState};
