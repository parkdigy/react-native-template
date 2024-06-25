import _animations from '../../common/animations';
import _api from '../../common/api';
import _app from '../../common/app';
import _storage from '../../common/storage';
import {text as _text} from '../../common/text';
import _util from '../../common/util';

/* eslint-disable */
declare global {
  var animations: typeof _animations;
  var api: typeof _api;
  var app: typeof _app;
  var storage: typeof _storage;
  var text: typeof _text;
  var util: typeof _util;
}
/* eslint-enable */

globalThis.animations = _animations;
globalThis.api = _api;
globalThis.app = _app;
globalThis.storage = _storage;
globalThis.text = _text;
globalThis.util = _util;

export {};
