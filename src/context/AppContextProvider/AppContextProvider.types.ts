import {AppContextValue} from '../AppContext';

export interface AppContextProviderProps {
  value: AppContextValue;
  children: ReactNode | null;
}
