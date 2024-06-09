/********************************************************************************************************************
 * App Context
 * ******************************************************************************************************************/

import {createContext} from 'react';
import {AppContextDefaultValue, AppContextValue} from './AppContext.types';

const AppContext = createContext<AppContextValue>(AppContextDefaultValue);

export default AppContext;
