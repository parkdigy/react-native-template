import {createContext} from 'react';
import {type FormContextValue} from './FormContext.types';

export const FormContext = createContext<FormContextValue | null>(null);
