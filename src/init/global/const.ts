import _Const from '@const';

declare global {
  var Const: typeof _Const;
}

globalThis.Const = _Const;

export {};
