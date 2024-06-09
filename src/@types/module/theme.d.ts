import 'styled-components';
import 'styled-components/native';
import 'react-native-paper';

declare module 'styled-components' {
  export interface DefaultTheme extends ReactNativePaperTheme {}
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends ReactNativePaperTheme {}
}

declare module 'react-native-paper' {
  export interface Theme extends ReactNativePaperTheme {}
}
