import {DefaultTheme} from '@react-navigation/native';
import PaperBlueLightTheme from './PaperBlueLightTheme';

const theme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: PaperBlueLightTheme.colors.background,
    primary: PaperBlueLightTheme.colors.primary,
    card: PaperBlueLightTheme.colors.surface,
    text: '#000',
  },
};

export default theme;
