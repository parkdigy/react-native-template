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
  groupSeq?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
  text: string | string[];
  links?: LinkTextLink[];
  linkStyle?: TextProps['style'];
  accentTexts?: string[];
  accentStyle?: TextProps['style'];
  activeText?: string;
  onLinkPress?(text: string): void;
}
