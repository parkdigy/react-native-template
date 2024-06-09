/********************************************************************************************************************
 * App Context Provider
 * ******************************************************************************************************************/

import React from 'react';
import AppContext from '../AppContext';
import {AppContextProviderProps as Props} from './AppContextProvider.types';

const AppContextProvider: React.FC<Props> = ({children, value}) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
