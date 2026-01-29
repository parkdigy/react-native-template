export function _objectKeys<T extends string>(obj: Record<T, any>): T[] {
  return Object.keys(obj) as T[];
}

declare global {
  var objectKeys: typeof _objectKeys;
}

globalThis.objectKeys = _objectKeys;

export {};
