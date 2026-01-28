import {
  type ValueOf as _ValueOf,
  type Dict as _Dict,
  type Arr as _Arr,
  type IsObject as _IsObject,
  type IsArray as _IsArray,
  type ObjectMerge as _ObjectMerge,
  type ArrayMerge as _ArrayMerge,
  type PartialPick as _PartialPick,
  type PartialOmit as _PartialOmit,
  type RequiredPick as _RequiredPick,
  type RequiredOmit as _RequiredOmit,
} from '@pdg/types';
import {
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
} from '@pdg/compare';
import {now as _now, nowJs as _nowJs, nowTime as _nowTime} from '@pdg/date-time';
import {lv as _lv, vl as _vl, copy as _copy} from '@pdg/data';
import {
  useChanged as _useChanged,
  useFirstSkipChanged as _useFirstSkipChanged,
  useEventEffect as _useEventEffect,
  useEventLayoutEffect as _useEventLayoutEffect,
  useFirstSkipEffect as _useFirstSkipEffect,
  useFirstSkipLayoutEffect as _useFirstSkipLayoutEffect,
  useForwardRef as _useForwardRef,
  useMounted as _useMounted,
  useMountedRef as _useMountedRef,
  useAutoUpdateRef as _useAutoUpdateRef,
  useTimeoutRef as _useTimeoutRef,
  clearTimeoutRef as _clearTimeoutRef,
  useIntervalRef as _useIntervalRef,
  clearIntervalRef as _clearIntervalRef,
} from '@pdg/react-hook';

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

  /** react-hook */
  var useChanged: typeof _useChanged;
  var useFirstSkipChanged: typeof _useFirstSkipChanged;
  var useEventEffect: typeof _useEventEffect;
  var useEventLayoutEffect: typeof _useEventLayoutEffect;
  var useFirstSkipEffect: typeof _useFirstSkipEffect;
  var useFirstSkipLayoutEffect: typeof _useFirstSkipLayoutEffect;
  var useForwardRef: typeof _useForwardRef;
  var useMounted: typeof _useMounted;
  var useMountedRef: typeof _useMountedRef;
  var useAutoUpdateRef: typeof _useAutoUpdateRef;
  var useTimeoutRef: typeof _useTimeoutRef;
  var clearTimeoutRef: typeof _clearTimeoutRef;
  var useIntervalRef: typeof _useIntervalRef;
  var clearIntervalRef: typeof _clearIntervalRef;
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

/** react-hook */
globalThis.useChanged = _useChanged;
globalThis.useFirstSkipChanged = _useFirstSkipChanged;
globalThis.useEventEffect = _useEventEffect;
globalThis.useEventLayoutEffect = _useEventLayoutEffect;
globalThis.useFirstSkipEffect = _useFirstSkipEffect;
globalThis.useFirstSkipLayoutEffect = _useFirstSkipLayoutEffect;
globalThis.useForwardRef = _useForwardRef;
globalThis.useMounted = _useMounted;
globalThis.useMountedRef = _useMountedRef;
globalThis.useAutoUpdateRef = _useAutoUpdateRef;
globalThis.useTimeoutRef = _useTimeoutRef;
globalThis.clearTimeoutRef = _clearTimeoutRef;
globalThis.useIntervalRef = _useIntervalRef;
globalThis.clearIntervalRef = _clearIntervalRef;

export {};
