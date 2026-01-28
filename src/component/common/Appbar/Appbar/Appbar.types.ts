import {type AppbarProps as PaperAppbarProps} from 'react-native-paper';
import {type StyleProp, type ViewStyle} from 'react-native';

export interface AppbarCommands {
  setBlur(blur: boolean): void;
}

export interface AppbarProps extends Partial<Omit<PaperAppbarProps, 'ref'>> {
  ref?: Ref<AppbarCommands>;
  title: ReactNode | string;
  hideTitle?: boolean;
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
