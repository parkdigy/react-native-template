import {text as _text} from '../../common';

/* eslint-disable */
declare global {
  var text: typeof _text;
}
/* eslint-enable */

globalThis.text = _text;

export {};
