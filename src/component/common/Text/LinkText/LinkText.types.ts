import {TextProps} from '../Text';

export interface LinkTextLink {
  text: string;
  subTexts: string[];
}

export interface LinkTextProps
  extends Omit<
    TextProps,
    | 'children'
    | 'onPress'
    | 'onPressIn'
    | 'onPressOut'
    | 'onLongPress'
    | 'onTextLayout'
    | 'onLayout'
    | 'onAccessibilityAction'
    | 'onAccessibilityEscape'
    | 'onAccessibilityTap'
    | 'onAnimationBegin'
    | 'onAnimationEnd'
    | 'onMagicTap'
    | 'onTransitionBegin'
    | 'onTransitionEnd'
  > {
  text: string;
  links: LinkTextLink[];
  onPressLink(text: string): void;
}
