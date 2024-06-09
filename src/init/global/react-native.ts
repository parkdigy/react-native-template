import {Keyboard as _Keyboard, Platform as _Platform} from 'react-native';

/* eslint-disable */
declare global {
  var Keyboard: typeof _Keyboard;
  var Platform: typeof _Platform;
  var isIos: boolean;
  var isAndroid: boolean;
}
/* eslint-enable */

globalThis.Keyboard = _Keyboard;
globalThis.Platform = _Platform;
globalThis.isIos = _Platform.OS === 'ios';
globalThis.isAndroid = _Platform.OS === 'android';

export {};
