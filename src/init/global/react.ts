import {
  type ReactNode as _ReactNode,
  type ReactElement as _ReactElement,
  type Ref as _Ref,
  type RefObject as _RefObject,
  useId as _useId,
  useRef as _useRef,
  useState as _useState,
  useEffect as _useEffect,
  useLayoutEffect as _useLayoutEffect,
  useCallback as _useCallback,
  useMemo as _useMemo,
} from 'react';

export function _withStaticProps<T, P>(component: T, props: P): T & P {
  return Object.assign(component as any, props);
}

declare global {
  type ReactNode = _ReactNode;
  type ReactElement = _ReactElement;
  type Ref<T> = _Ref<T>;
  type RefObject<T> = _RefObject<T>;

  var useId: typeof _useId;
  var useRef: typeof _useRef;
  var useLayoutEffect: typeof _useLayoutEffect;
  var useEffect: typeof _useEffect;
  var useCallback: typeof _useCallback;
  var useMemo: typeof _useMemo;
  var useState: typeof _useState;

  var withStaticProps: typeof _withStaticProps;
}

globalThis.useId = _useId;
globalThis.useRef = _useRef;
globalThis.useLayoutEffect = _useLayoutEffect;
globalThis.useEffect = _useEffect;
globalThis.useCallback = _useCallback;
globalThis.useMemo = _useMemo;
globalThis.useState = _useState;

globalThis.withStaticProps = _withStaticProps;

/********************************************************************************************************************
 * export
 * ******************************************************************************************************************/
export {};
