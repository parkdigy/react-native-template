declare global {
  var nextTick: (callback: () => void, delay?: number) => NodeJS.Timeout;
}

globalThis.nextTick = (callback: () => void, delay?: number): NodeJS.Timeout => {
  return setTimeout(callback, delay === undefined ? 1 : delay);
};

export {};
