import {useTheme as _useTheme} from 'react-native-paper';
import {PaperBlueDarkTheme, PaperBlueLightTheme} from '@theme';

declare global {
  type ReactNativePaperTheme = typeof PaperBlueLightTheme;
  type StyledReactNativePaperTheme = {theme: ReactNativePaperTheme};
  function useTheme(dark?: boolean): ReactNativePaperTheme;
}

globalThis.useTheme = (dark?: boolean) => {
  return dark === true ? PaperBlueDarkTheme : dark === false ? PaperBlueLightTheme : _useTheme();
};

export {};
