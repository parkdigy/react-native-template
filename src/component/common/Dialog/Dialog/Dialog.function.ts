import React from 'react';
import {DialogAlertProps, DialogCommands, DialogConfirmProps, DialogInnerCommands} from '../Dialog';

let refs: React.RefObject<DialogInnerCommands>[] = [];
let isHiding = false;

export function __addRef(ref: React.RefObject<DialogInnerCommands>) {
  refs.push(ref);
}

export function __removeRef(ref: React.RefObject<DialogInnerCommands>) {
  refs = refs.filter((r) => r !== ref);
}

export function __setIsHiding(isHidingValue: boolean) {
  isHiding = isHidingValue;
}

export function __openAlert(props: DialogAlertProps): DialogCommands {
  if (refs.length > (isHiding ? 1 : 0)) {
    const lastInstance = refs[refs.length - (isHiding ? 2 : 1)].current;
    if (lastInstance) {
      return lastInstance.openAlert(props);
    }
  }
  throw Error('Dialog Instance Not Exists');
}

export function __openSuccessAlert(
  props: Pick<
    DialogAlertProps,
    'contentTitle' | 'content' | 'subContent' | 'subHiddenContent' | 'onConfirm' | 'preventBackClose'
  >,
): DialogCommands {
  if (refs.length > (isHiding ? 1 : 0)) {
    const lastInstance = refs[refs.length - (isHiding ? 2 : 1)].current;
    if (lastInstance) {
      return lastInstance.openAlert({icon: 'check', ...props});
    }
  }
  throw Error('Dialog Instance Not Exists');
}

export function __openErrorAlert(
  props: Pick<
    DialogAlertProps,
    'contentTitle' | 'content' | 'subContent' | 'subHiddenContent' | 'onConfirm' | 'preventBackClose'
  >,
): DialogCommands {
  if (refs.length > (isHiding ? 1 : 0)) {
    const lastInstance = refs[refs.length - (isHiding ? 2 : 1)].current;
    if (lastInstance) {
      return lastInstance.openAlert({icon: 'info', ...props});
    }
  }
  throw Error('Dialog Instance Not Exists');
}

export function __openConfirm(props: DialogConfirmProps): DialogCommands {
  if (refs.length > (isHiding ? 1 : 0)) {
    const lastInstance = refs[refs.length - (isHiding ? 2 : 1)].current;
    if (lastInstance) {
      return lastInstance.openConfirm(props);
    }
  }
  throw Error('Dialog Instance Not Exists');
}
