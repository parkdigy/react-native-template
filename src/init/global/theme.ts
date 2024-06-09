import {useTheme as _useTheme} from 'react-native-paper';
import {PaperBlueLightTheme} from '../../theme';

declare global {
  type ReactNativePaperTheme = typeof PaperBlueLightTheme;
  type StyledReactNativePaperTheme = {theme: ReactNativePaperTheme};
  function useTheme(): ReactNativePaperTheme;
}

globalThis.useTheme = () => {
  return _useTheme();
};

export {};
