import {createContext} from 'react';
import {FormContextValue} from './FormContext.types';

export const FormContext = createContext<FormContextValue | null>(null);
