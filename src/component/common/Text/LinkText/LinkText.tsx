import React from 'react';
import {LinkTextProps as Props} from './LinkText.types';
import {Text} from '../Text';

export const LinkText = ({text, links, style, onPressLink, ...props}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const renderTexts = useMemo(() => {
    let renderText = text;

    for (const link of links) {
      const texts = [...link.subTexts, link.text];
      for (const v of texts) {
        // renderText 에서 text 찾아서 모두 ||| 로 감싸도록 변경
        renderText = renderText.replaceAll(v, `[[[#${link.text}|${v}]]]`);
      }
    }

    return renderText.split(/\[\[\[([^\]]+)\]\]\]/g);
  }, [text, links]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Text {...props}>
      {renderTexts.map((text, idx) => {
        let isLink = false;
        let linkText: string | undefined;
        let finalText: string;
        if (text.startsWith('#') && text.includes('|')) {
          const link = text.substring(1).split('|');
          isLink = true;
          linkText = link[0];
          finalText = link[1];
        } else {
          finalText = text;
        }

        return isLink && notEmpty(linkText) ? (
          <Text key={idx} {...props} style={[style, styles.link]} onPress={() => onPressLink(linkText)}>
            {finalText}
          </Text>
        ) : (
          <Text key={idx} {...props} style={style}>
            {finalText}
          </Text>
        );
      })}
    </Text>
  );
};

export default LinkText;

/********************************************************************************************************************
 * Styles
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    fontWeight: 500,
  },
});
