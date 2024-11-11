import {getModel} from 'react-native-device-info';

declare global {
  function ll(message?: any, ...optionalParams: any[]): void;
}

globalThis.ll = function (message?: any, ...optionalParams: any[]) {
  if (__DEV__) {
    console.log(`[${Platform.OS}-${getModel()}]`, message, ...optionalParams);
  }
};

export {};
