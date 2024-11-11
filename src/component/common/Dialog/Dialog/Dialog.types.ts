import {ReactElement} from 'react';

export type DialogPosition = 'top' | 'center' | 'bottom';

type DialogButtonProps = Omit<ButtonProps, 'children' | 'onPress'>;

interface DialogCommonProps {
  __hide?: boolean;
  color?: 'primary' | 'error' | 'success' | string;
  icon?: 'info' | 'check' | 'question' | ReactElement;
  iconColor?: string;
  minWidth?: number;
  maxWidth?: number;
  ph?: number;
  pv?: number;
  spacing?: number;
  title?: ReactNode;
  titleColor?: string;
  contentTitle?: ReactNode;
  contentTitleColor?: string;
  content: ReactNode;
  contentColor?: string;
  subContent?: ReactNode;
  subContentColor?: string;
  subHiddenContent?: ReactNode;
  autoHide?: boolean;
  position?: DialogPosition;
  marginTop?: number;
  marginBottom?: number;
  buttonSize?: ButtonSize;
  reverseButtons?: boolean;
  confirmLabel?: string;
  confirmButtonColor?: ButtonProps['color'];
  confirmButtonProps?: DialogButtonProps;
  bottomView?: ReactElement;
  preventBackClose?: boolean;
  onConfirm?(): void;
}
export interface DialogProps extends DialogCommonProps {
  cancelLabel?: string;
  cancelButtonColor?: ButtonProps['color'];
  cancelButtonProps?: DialogButtonProps;
  onCancel?(): void;
}

export interface DialogAlertProps extends DialogCommonProps {}

export interface DialogConfirmProps extends DialogCommonProps, Pick<DialogProps, 'cancelLabel' | 'onCancel'> {}

export interface DialogInnerCommands {
  openAlert(props: DialogAlertProps): DialogCommands;
  openConfirm(props: DialogConfirmProps): DialogCommands;
}

export interface DialogCommands {
  close(): void;
  setLoading(loading: boolean): void;
}
