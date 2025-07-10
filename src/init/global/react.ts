import {
  ReactNode as _ReactNode,
  useId as _useId,
  useRef as _useRef,
  useState as _useState,
  useEffect as _useEffect,
  useLayoutEffect as _useLayoutEffect,
  useCallback as _useCallback,
  useMemo as _useMemo,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

const _withStaticProps = <Props, Ref, T>(
  forwarded: ForwardRefExoticComponent<Props & RefAttributes<Ref>>,
  staticProps: T,
) => Object.assign(forwarded, staticProps);

declare global {
  type ReactNode = _ReactNode;

  var withStaticProps: typeof _withStaticProps;

  var useId: typeof _useId;
  var useRef: typeof _useRef;
  var useLayoutEffect: typeof _useLayoutEffect;
  var useEffect: typeof _useEffect;
  var useCallback: typeof _useCallback;
  var useMemo: typeof _useMemo;
  var useState: typeof _useState;
}

globalThis.withStaticProps = _withStaticProps;

globalThis.useId = _useId;
globalThis.useRef = _useRef;
globalThis.useLayoutEffect = _useLayoutEffect;
globalThis.useEffect = _useEffect;
globalThis.useCallback = _useCallback;
globalThis.useMemo = _useMemo;
globalThis.useState = _useState;

/********************************************************************************************************************
 * export
 * ******************************************************************************************************************/
export {};
