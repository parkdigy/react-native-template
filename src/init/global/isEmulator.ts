import {getManufacturerSync, getModel, getProductSync, isEmulatorSync} from 'react-native-device-info';

const deviceModel = getModel();
const deviceManufacturer = getManufacturerSync();
const deviceProduct = getProductSync();

let emulator = isEmulatorSync();

if (!emulator) {
  const knownEmulators = [
    'Genymotion',
    'Bluestacks',
    'NoxPlayer',
    'MEmu',
    'KoPlayer',
    'Remix OS Player',
    'Droid4X',
    'Andy',
    'Windroy',
    'Phoenix OS',
    'Xamarin',
    'VirtualBox',
    'VMware',
  ];

  for (const knowEmulator of knownEmulators) {
    if (
      deviceModel.includes(knowEmulator) ||
      deviceManufacturer.includes(knowEmulator) ||
      deviceProduct.includes(knowEmulator)
    ) {
      emulator = true;
      break;
    }
  }
}

/* eslint-disable */
declare global {
  var isEmulator: boolean;
}
/* eslint-enable */

globalThis.isEmulator = emulator;
