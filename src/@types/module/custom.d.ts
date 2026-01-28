declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: (props: SvgProps) => React.JSX.Element;
  export default content;
}

declare module '*.png' {}
