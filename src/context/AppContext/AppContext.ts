/********************************************************************************************************************
 * App Context
 * ******************************************************************************************************************/

import {createContext} from 'react';
import {type AppContextValue} from './AppContext.types';

const AppContext = createContext<AppContextValue>({} as any);

export default AppContext;
