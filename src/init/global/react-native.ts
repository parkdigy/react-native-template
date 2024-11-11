import {Keyboard as _Keyboard, Platform as _Platform, StyleSheet as _StyleSheet} from 'react-native';

declare global {
  var Keyboard: typeof _Keyboard;
  var Platform: typeof _Platform;
  var StyleSheet: typeof _StyleSheet;
  var isIos: boolean;
  var isAndroid: boolean;
}

globalThis.Keyboard = _Keyboard;
globalThis.Platform = _Platform;
globalThis.StyleSheet = _StyleSheet;
globalThis.isIos = _Platform.OS === 'ios';
globalThis.isAndroid = _Platform.OS === 'android';

export {};
