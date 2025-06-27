import {useSafeAreaInsets as _useSafeAreaInsets} from 'react-native-safe-area-context';

declare global {
  var useSafeAreaInsets: typeof _useSafeAreaInsets;
}

globalThis.useSafeAreaInsets = _useSafeAreaInsets;

export {};
