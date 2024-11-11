import {
  /** types */
  ValueOf as _ValueOf,
  Dict as _Dict,
  Arr as _Arr,
  IsObject as _IsObject,
  IsArray as _IsArray,
  ObjectMerge as _ObjectMerge,
  ArrayMerge as _ArrayMerge,
  PartialPick as _PartialPick,
  PartialOmit as _PartialOmit,
  RequiredPick as _RequiredPick,
  RequiredOmit as _RequiredOmit,
  /** compare */
  empty as _empty,
  notEmpty as _notEmpty,
  equal as _equal,
  contains as _contains,
  ifNull as _ifNull,
  ifNotNull as _ifNotNull,
  ifUndefined as _ifUndefined,
  ifNotUndefined as _ifNotUndefined,
  ifNullOrUndefined as _ifNullOrUndefined,
  ifNotNullAndUndefined as _ifNotNullAndUndefined,
  isEmail as _isEmail,
  /** date */
  now as _now,
  nowJs as _nowJs,
  nowTime as _nowTime,
  /** data */
  lv as _lv,
  vl as _vl,
  copy as _copy,
  /** number */
  numberFormat as _numberFormat,
  /** delay */
  nextTick as _nextTick,
} from '@pdg/util';

declare global {
  /** types */
  type ValueOf<T> = _ValueOf<T>;
  type Dict<T = any> = _Dict<T>;
  type Arr<T = any> = _Arr<T>;
  type IsObject<T> = _IsObject<T>;
  type IsArray<T> = _IsArray<T>;
  type ObjectMerge<T> = _ObjectMerge<T>;
  type ArrayMerge<A extends any[]> = _ArrayMerge<A>;
  type PartialPick<T, K extends keyof T> = _PartialPick<T, K>;
  type PartialOmit<T, K extends keyof T> = _PartialOmit<T, K>;
  type RequiredPick<T, K extends keyof T> = _RequiredPick<T, K>;
  type RequiredOmit<T, K extends keyof T> = _RequiredOmit<T, K>;

  /** compare */
  var empty: typeof _empty;
  var notEmpty: typeof _notEmpty;
  var equal: typeof _equal;
  var contains: typeof _contains;
  var ifNull: typeof _ifNull;
  var ifNotNull: typeof _ifNotNull;
  var ifUndefined: typeof _ifUndefined;
  var ifNotUndefined: typeof _ifNotUndefined;
  var ifNullOrUndefined: typeof _ifNullOrUndefined;
  var ifNotNullAndUndefined: typeof _ifNotNullAndUndefined;
  var isEmail: typeof _isEmail;

  /** date */
  var now: typeof _now;
  var nowJs: typeof _nowJs;
  var nowTime: typeof _nowTime;

  /** data */
  var lv: typeof _lv;
  var vl: typeof _vl;
  var copy: typeof _copy;

  /** number */
  var numberFormat: typeof _numberFormat;

  /** delay */
  var nextTick: typeof _nextTick;
}

/** compare */
globalThis.empty = _empty;
globalThis.notEmpty = _notEmpty;
globalThis.equal = _equal;
globalThis.contains = _contains;
globalThis.ifNull = _ifNull;
globalThis.ifNotNull = _ifNotNull;
globalThis.ifUndefined = _ifUndefined;
globalThis.ifNotUndefined = _ifNotUndefined;
globalThis.ifNullOrUndefined = _ifNullOrUndefined;
globalThis.ifNotNullAndUndefined = _ifNotNullAndUndefined;
globalThis.isEmail = _isEmail;

/** date */
globalThis.now = _now;
globalThis.nowJs = _nowJs;
globalThis.nowTime = _nowTime;

/** data */
globalThis.lv = _lv;
globalThis.vl = _vl;
globalThis.copy = _copy;

/** number */
globalThis.numberFormat = _numberFormat;

/** delay */
globalThis.nextTick = _nextTick;

export {};
