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
  Dispatch,
  SetStateAction,
} from 'react';

const _withStaticProps = <Props, Ref, T>(
  forwarded: ForwardRefExoticComponent<Props & RefAttributes<Ref>>,
  staticProps: T,
) => Object.assign(forwarded, staticProps);

/* eslint-disable */
declare global {
  type ReactNode = _ReactNode;

  var withStaticProps: typeof _withStaticProps;

  var useId: typeof _useId;
  var useRef: typeof _useRef;
  var useState: typeof _useState;
  var useLayoutEffect: typeof _useLayoutEffect;
  var useEffect: typeof _useEffect;
  var useCallback: typeof _useCallback;
  var useMemo: typeof _useMemo;
}
/* eslint-enable */

globalThis.withStaticProps = _withStaticProps;

globalThis.useId = _useId;
globalThis.useRef = _useRef;
globalThis.useLayoutEffect = _useLayoutEffect;
globalThis.useEffect = _useEffect;
globalThis.useCallback = _useCallback;
globalThis.useMemo = _useMemo;

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
function useSafeState<S>(initialState?: S | (() => S)): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [value, setValue] = _useState(initialState);
  const isMountedRef = _useRef(true);

  _useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeSetValue = _useCallback((newValue: any) => {
    if (isMountedRef.current) {
      setValue(newValue);
    } else {
      if (__DEV__) {
        ll('unmounted set value', newValue);
      }
    }
  }, []);

  return [value, safeSetValue];
}

globalThis.useState = useSafeState;

export {};
