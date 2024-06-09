declare global {
  function ll(message?: any, ...optionalParams: any[]): void;
}

globalThis.ll = function (message?: any, ...optionalParams: any[]) {
  console.log(message, ...optionalParams);
};

export {};
