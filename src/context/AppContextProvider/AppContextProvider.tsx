/********************************************************************************************************************
 * App Context Provider
 * ******************************************************************************************************************/

import AppContext from '../AppContext';
import {type AppContextProviderProps as Props} from './AppContextProvider.types';

const AppContextProvider = ({children, value}: Props) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
