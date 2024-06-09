import {AppbarProps as PaperAppbarProps} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';

export interface AppbarCommands {
  setBlur(blur: boolean): void;
}

export interface AppbarProps extends Partial<Omit<PaperAppbarProps, 'ref'>> {
  title: ReactNode | string;
  type?: 'default' | 'safe-area' | 'modal' | 'fullscreen-modal';
  height?: number;
  modalHeight?: number;
  containerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  blur?: boolean;
  disabled?: boolean;
  subContent?: (ReactNode | false | undefined | null)[] | ReactNode | false | undefined | null;
  onBack?(): void;
  onClose?(): void;
}
