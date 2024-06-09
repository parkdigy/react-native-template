import {ScrollViewProps} from '../../View/ScrollView';

export interface KeyboardAwareScrollViewProps extends ScrollViewProps {
  extraHeight?: number;
  disableAutoScroll?: boolean;
  onKeyboardShow?(keyboardHeight: number): void;
  onKeyboardHide?(): void;
}
