import * as _animations from '../../common/animations';
import * as _api from '../../common/api';
import * as _app from '../../common/app';
import * as _storage from '../../common/storage';
import * as _text from '../../common/text';
import * as _util from '../../common/util';
import * as _firebase from '../../common/firebase';

declare global {
  var animations: typeof _animations.default;
  var api: typeof _api.default;
  type ApiPaging = _api.ApiPaging;
  type ApiResult = _api.ApiResult;
  type ApiResultPaging = _api.ApiResultPaging;
  type ApiPageLimitRequestData = _api.ApiPageLimitRequestData;
  var app: typeof _app.default;
  var storage: typeof _storage.default;
  var text: typeof _text.default;
  var util: typeof _util.default;
  var firebase: typeof _firebase.default;
}

globalThis.animations = _animations.default;
globalThis.api = _api.default;
globalThis.app = _app.default;
globalThis.storage = _storage.default;
globalThis.text = _text.default;
globalThis.util = _util.default;
globalThis.firebase = _firebase.default;

export {};
