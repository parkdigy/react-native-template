import * as PdgTypes from '@pdg/types';
import * as PdgCompare from '@pdg/compare';
import * as PdgDateTime from '@pdg/date-time';
import * as PdgData from '@pdg/data';
import * as PdgApi from '@pdg/api';
import * as PdgReactHook from '@pdg/react-hook';

declare global {
  /** types */
  type ValueOf<T> = PdgTypes.ValueOf<T>;
  type Dict<T = any> = PdgTypes.Dict<T>;
  type Arr<T = any> = PdgTypes.Arr<T>;
  type IsObject<T> = PdgTypes.IsObject<T>;
  type IsArray<T> = PdgTypes.IsArray<T>;
  type ObjectMerge<T> = PdgTypes.ObjectMerge<T>;
  type ArrayMerge<A extends any[]> = PdgTypes.ArrayMerge<A>;
  type PartialPick<T, K extends keyof T> = PdgTypes.PartialPick<T, K>;
  type PartialOmit<T, K extends keyof T> = PdgTypes.PartialOmit<T, K>;
  type RequiredPick<T, K extends keyof T> = PdgTypes.RequiredPick<T, K>;
  type RequiredOmit<T, K extends keyof T> = PdgTypes.RequiredOmit<T, K>;

  /** compare */
  var empty: typeof PdgCompare.empty;
  var notEmpty: typeof PdgCompare.notEmpty;
  var equal: typeof PdgCompare.equal;
  var contains: typeof PdgCompare.contains;
  var ifNull: typeof PdgCompare.ifNull;
  var ifNotNull: typeof PdgCompare.ifNotNull;
  var ifUndefined: typeof PdgCompare.ifUndefined;
  var ifNotUndefined: typeof PdgCompare.ifNotUndefined;
  var ifNullOrUndefined: typeof PdgCompare.ifNullOrUndefined;
  var ifNotNullAndUndefined: typeof PdgCompare.ifNotNullAndUndefined;
  var isEmail: typeof PdgCompare.isEmail;

  /** date-time */
  var now: typeof PdgDateTime.now;
  var nowJs: typeof PdgDateTime.nowJs;
  var nowTime: typeof PdgDateTime.nowTime;

  /** data */
  var lv: typeof PdgData.lv;
  var vl: typeof PdgData.vl;
  var copy: typeof PdgData.copy;

  /** api */
  type ApiRequestData = PdgApi.ApiRequestData;
  type ApiRequestOption = PdgApi.ApiRequestOption;
  type ApiOption<T = any, D = ApiRequestData> = PdgApi.ApiOption<T, D>;
  var ApiError: typeof PdgApi.ApiError;
  type ApiError<T = any, D = ApiRequestData> = PdgApi.ApiError<T, D>;

  /** react-hook */
  var useChanged: typeof PdgReactHook.useChanged;
  var useFirstSkipChanged: typeof PdgReactHook.useFirstSkipChanged;
  var useEventEffect: typeof PdgReactHook.useEventEffect;
  var useEventLayoutEffect: typeof PdgReactHook.useEventLayoutEffect;
  var useFirstSkipEffect: typeof PdgReactHook.useFirstSkipEffect;
  var useFirstSkipLayoutEffect: typeof PdgReactHook.useFirstSkipLayoutEffect;
  var useForwardRef: typeof PdgReactHook.useForwardRef;
  var useMounted: typeof PdgReactHook.useMounted;
  var useMountedRef: typeof PdgReactHook.useMountedRef;
  var useAutoUpdateRef: typeof PdgReactHook.useAutoUpdateRef;
  var useTimeoutRef: typeof PdgReactHook.useTimeoutRef;
  var clearTimeoutRef: typeof PdgReactHook.clearTimeoutRef;
  var useIntervalRef: typeof PdgReactHook.useIntervalRef;
  var clearIntervalRef: typeof PdgReactHook.clearIntervalRef;
}

/** compare */
globalThis.empty = PdgCompare.empty;
globalThis.notEmpty = PdgCompare.notEmpty;
globalThis.equal = PdgCompare.equal;
globalThis.contains = PdgCompare.contains;
globalThis.ifNull = PdgCompare.ifNull;
globalThis.ifNotNull = PdgCompare.ifNotNull;
globalThis.ifUndefined = PdgCompare.ifUndefined;
globalThis.ifNotUndefined = PdgCompare.ifNotUndefined;
globalThis.ifNullOrUndefined = PdgCompare.ifNullOrUndefined;
globalThis.ifNotNullAndUndefined = PdgCompare.ifNotNullAndUndefined;
globalThis.isEmail = PdgCompare.isEmail;

/** date */
globalThis.now = PdgDateTime.now;
globalThis.nowJs = PdgDateTime.nowJs;
globalThis.nowTime = PdgDateTime.nowTime;

/** data */
globalThis.lv = PdgData.lv;
globalThis.vl = PdgData.vl;
globalThis.copy = PdgData.copy;

/** api */
globalThis.ApiError = PdgApi.ApiError;

/** react-hook */
globalThis.useChanged = PdgReactHook.useChanged;
globalThis.useFirstSkipChanged = PdgReactHook.useFirstSkipChanged;
globalThis.useEventEffect = PdgReactHook.useEventEffect;
globalThis.useEventLayoutEffect = PdgReactHook.useEventLayoutEffect;
globalThis.useFirstSkipEffect = PdgReactHook.useFirstSkipEffect;
globalThis.useFirstSkipLayoutEffect = PdgReactHook.useFirstSkipLayoutEffect;
globalThis.useForwardRef = PdgReactHook.useForwardRef;
globalThis.useMounted = PdgReactHook.useMounted;
globalThis.useMountedRef = PdgReactHook.useMountedRef;
globalThis.useAutoUpdateRef = PdgReactHook.useAutoUpdateRef;
globalThis.useTimeoutRef = PdgReactHook.useTimeoutRef;
globalThis.clearTimeoutRef = PdgReactHook.clearTimeoutRef;
globalThis.useIntervalRef = PdgReactHook.useIntervalRef;
globalThis.clearIntervalRef = PdgReactHook.clearIntervalRef;

export {};
