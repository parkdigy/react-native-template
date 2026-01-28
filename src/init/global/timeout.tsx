declare global {
  function delayTimeout(callback: () => void): number;
  function delayTimeout(callback: () => void, delay: number): number;
  function delayTimeout(callback: () => void, startTime: number, delay: number): number;
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

export {};
