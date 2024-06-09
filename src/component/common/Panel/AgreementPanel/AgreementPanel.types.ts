import {PanelProps} from '../Panel';

export interface AgreementPanelProps extends Pick<PanelProps, 'itemPadding'> {
  title?: string;
  disabled?: boolean;
  allCheck?: boolean;
  allCheckName?: string;
  children?: ReactNode;
}
