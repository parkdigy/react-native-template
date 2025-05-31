import React from 'react';

type UseTimeoutReturnValue = [
  React.MutableRefObject<NodeJS.Timeout | undefined>,
  (callback: (args: void) => void, ms?: number) => void,
];

type UseIntervalReturnValue = [
  React.MutableRefObject<NodeJS.Timeout | undefined>,
  (callback: (ref: React.MutableRefObject<NodeJS.Timeout | undefined>) => void, ms?: number) => void,
];

declare global {
  function delayTimeout(callback: () => void): number;
  function delayTimeout(callback: () => void, delay: number): number;
  function delayTimeout(callback: () => void, startTime: number, delay: number): number;

  function clearTimeoutRef(ref: React.RefObject<NodeJS.Timeout | undefined>): void;
  function clearIntervalRef(ref: React.RefObject<NodeJS.Timeout | undefined>): void;

  function useTimeoutRef(): UseTimeoutReturnValue;
  function useIntervalRef(): UseIntervalReturnValue;
}

const DEFAULT_DELAY = 500;

globalThis.delayTimeout = function (callback: () => void, startTimeOrDelay?: number, delay?: number): number {
  if (startTimeOrDelay === undefined && delay === undefined) {
    return setTimeout(callback, DEFAULT_DELAY) as unknown as number;
  } else if (startTimeOrDelay !== undefined && delay === undefined) {
    return setTimeout(callback, startTimeOrDelay) as unknown as number;
  } else if (startTimeOrDelay !== undefined && delay !== undefined) {
    const pastTime = new Date().getTime() - startTimeOrDelay;
    return setTimeout(callback, pastTime > delay ? 0 : delay - pastTime) as unknown as number;
  } else {
    return setTimeout(callback, 0) as unknown as number;
  }
};

/********************************************************************************************************************
 * clearTimeoutRef
 * ******************************************************************************************************************/

globalThis.clearTimeoutRef = (ref) => {
  if (ref.current) {
    clearTimeout(ref.current);
    ref.current = undefined;
  }
};

/********************************************************************************************************************
 * clearIntervalRef
 * ******************************************************************************************************************/

globalThis.clearIntervalRef = (ref) => {
  if (ref.current) {
    clearInterval(ref.current);
    ref.current = undefined;
  }
};

/********************************************************************************************************************
 * useTimeoutRef
 * ******************************************************************************************************************/

const useTimeout = (): UseTimeoutReturnValue => {
  const ref = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    return () => {
      clearTimeoutRef(ref);
    };
  }, []);

  const setTimeoutFunc = useCallback((callback: (args: void) => void, ms?: number) => {
    clearTimeoutRef(ref);

    ref.current = setTimeout(() => {
      ref.current = undefined;
      callback();
    }, ms);
  }, []);

  return [ref, setTimeoutFunc];
};

globalThis.useTimeoutRef = useTimeout;

/********************************************************************************************************************
 * useIntervalRef
 * ******************************************************************************************************************/

const useInterval = (): UseIntervalReturnValue => {
  const ref = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    return () => {
      clearIntervalRef(ref);
    };
  }, []);

  const setIntervalFunc = useCallback(
    (callback: (ref: React.MutableRefObject<NodeJS.Timeout | undefined>) => void, ms?: number) => {
      clearIntervalRef(ref);

      ref.current = setInterval(() => {
        callback(ref);
      }, ms);
    },
    [],
  );

  return [ref, setIntervalFunc];
};

globalThis.useIntervalRef = useInterval;

export {};
