import React from 'react';
import {LinkTextProps as Props} from './LinkText.types';
import {Text} from '../Text';

export const LinkText = ({text, links, style, linkStyle, onPressLink, ...props}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const renderTexts = useMemo(() => {
    let renderText = text;

    for (const link of links) {
      const texts = [link.text, ...link.subTexts];
      for (const replaceText of texts) {
        // renderText 에서 replaceText 찾아서 모두 [[[ | ]]] 로 감싸도록 변경
        renderText = renderText
          .split(/\[\[\[([^\]]+)\]\]\]/g)
          .map((v) => {
            if (v.startsWith('#') && v.includes('|')) {
              return `[[[${v}]]]`;
            } else {
              return v.replaceAll(replaceText, `[[[#${link.text}|${replaceText}]]]`);
            }
          })
          .join('');
      }
    }

    return renderText.split(/\[\[\[([^\]]+)\]\]\]/g);
  }, [text, links]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Text {...props}>
      {renderTexts.map((t, idx) => {
        let isLink = false;
        let linkText: string | undefined;
        let finalText: string;
        if (t.startsWith('#') && t.includes('|')) {
          const link = t.substring(1).split('|');
          isLink = true;
          linkText = link[0];
          finalText = link[1];
        } else {
          finalText = t;
        }

        return isLink && notEmpty(linkText) ? (
          <Text key={idx} {...props} style={[style, linkStyle]} onPress={() => onPressLink(linkText)}>
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
