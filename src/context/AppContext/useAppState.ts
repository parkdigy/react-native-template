import {useContext} from 'react';
import AppContext from './AppContext';
import {type AppContextValue} from './AppContext.types';

export default function useAppState(): AppContextValue {
  const value = useContext(AppContext);
  if (value === undefined) {
    throw new Error('useAppState should be used within AppContext.Provider');
  }
  return value;
}
