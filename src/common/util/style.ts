import {type StyleProp, type RecursiveArray, type TextStyle} from 'react-native';

export default {
  findFontWeight(s: RecursiveArray<StyleProp<TextStyle>>): TextStyle['fontWeight'] {
    let fw: TextStyle['fontWeight'];
    for (const s2 of s.reverse()) {
      if (Array.isArray(s2)) {
        fw = this.findFontWeight(s2);
      } else if (typeof s2 === 'object') {
        if ((s2 as TextStyle).fontWeight !== undefined) {
          fw = (s2 as TextStyle).fontWeight;
        }
      }
      if (fw !== undefined) {
        break;
      }
    }
    return fw;
  },
};
