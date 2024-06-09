import {DarkTheme} from '@react-navigation/native';
import PaperBlueDarkTheme from './PaperBlueDarkTheme';

export default {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: PaperBlueDarkTheme.colors.background,
    primary: PaperBlueDarkTheme.colors.primary,
    card: PaperBlueDarkTheme.colors.surface,
    text: '#fff',
  },
};
