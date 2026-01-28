import {Keyboard as _Keyboard, Platform as _Platform, StyleSheet as _StyleSheet} from 'react-native';
import {isTablet as _isTablet} from 'react-native-device-info';

declare global {
  var Keyboard: typeof _Keyboard;
  var Platform: typeof _Platform;
  // @ts-ignore
  var StyleSheet: typeof _StyleSheet;
  var isIos: boolean;
  var isAndroid: boolean;
  var isTablet: boolean;
  var tabletSizeFactor: number;
}

globalThis.Keyboard = _Keyboard;
globalThis.Platform = _Platform;
// @ts-ignore
globalThis.StyleSheet = _StyleSheet;
globalThis.isIos = _Platform.OS === 'ios';
globalThis.isAndroid = _Platform.OS === 'android';
globalThis.isTablet = _isTablet();
globalThis.tabletSizeFactor = _isTablet() ? 1.3 : 1;

export {};
