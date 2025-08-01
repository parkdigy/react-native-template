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
  transparent?: boolean;
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
  bottomView?: ReactElement;
  preventBackClose?: boolean;
  onConfirm?(): void;
}
export interface DialogProps extends DialogCommonProps {
  confirmLabel?: string;
  confirmButtonColor?: ButtonProps['color'];
  confirmButtonProps?: DialogButtonProps;
  cancelLabel?: string;
  cancelButtonColor?: ButtonProps['color'];
  cancelButtonProps?: DialogButtonProps;
  onCancel?(): void;
}

export interface DialogOnlyProps extends DialogCommonProps {}

export interface DialogAlertProps
  extends DialogCommonProps,
    Pick<DialogProps, 'confirmLabel' | 'confirmButtonColor' | 'confirmButtonProps'> {}

export interface DialogConfirmProps
  extends DialogCommonProps,
    Pick<
      DialogProps,
      | 'cancelLabel'
      | 'cancelButtonColor'
      | 'cancelButtonProps'
      | 'onCancel'
      | 'confirmLabel'
      | 'confirmButtonColor'
      | 'confirmButtonProps'
    > {}

export interface DialogInnerCommands {
  open(props: DialogOnlyProps): DialogCommands;
  openAlert(props: DialogAlertProps): DialogCommands;
  openConfirm(props: DialogConfirmProps): DialogCommands;
}

export interface DialogCommands {
  close(): void;
  setLoading(loading: boolean): void;
}
