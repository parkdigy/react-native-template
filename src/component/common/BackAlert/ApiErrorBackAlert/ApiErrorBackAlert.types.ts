import {BackAlertProps} from '../BackAlert';

export interface ApiErrorBackAlertProps
  extends Pick<
    BackAlertProps,
    'iconColor' | 'textColor' | 'retryButtonProps' | 'closeButtonProps' | 'onRetryPress' | 'onClosePress' | 'onLayout'
  > {
  text?: string;
}
