import {getModel} from 'react-native-device-info';

declare global {
  function ll(message?: any, ...optionalParams: any[]): void;
  function le(message?: any, ...optionalParams: any[]): void;
}

globalThis.ll = function (message?: any, ...optionalParams: any[]) {
  if (__DEV__) {
    console.log(`[${Platform.OS}-${getModel()}]`, message, ...optionalParams);
  }
};

globalThis.le = function (message?: any, ...optionalParams: any[]) {
  if (__DEV__) {
    console.error(`[${Platform.OS}-${getModel()}]`, message, ...optionalParams);
  }
};

export {};
