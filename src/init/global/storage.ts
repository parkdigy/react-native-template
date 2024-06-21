import _storage from '../../common/storage';

/* eslint-disable */
declare global {
  var storage: typeof _storage;
}
/* eslint-enable */

globalThis.storage = _storage;

export {};
