import _app from '../../common/app';

/* eslint-disable */
declare global {
  var app: typeof _app;
}
/* eslint-enable */

globalThis.app = _app;

export {};
