import React from 'react';
import {LinkTextLink, LinkTextProps as Props} from './LinkText.types';
import useLinkTextGroupState from '../LinkTextGroup/useLinkTextGroupState';

export const LinkText = ({
  groupSeq,
  text,
  links: initLinks,
  style,
  linkStyle,
  accentTexts,
  accentStyle,
  activeText,
  onLinkPress,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const groupState = useLinkTextGroupState();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [links, setLinks] = useState<LinkTextLink[]>();

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (groupState && groupSeq) {
      groupState.register(groupSeq, text, {
        onLinks(newLinks) {
          setLinks(newLinks);
        },
      });

      return () => {
        groupState.unregister(groupSeq);
      };
    } else {
      setLinks(initLinks);
    }
  }, [groupState, groupSeq, text, initLinks]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const renderSentences = useMemo(() => {
    const lines = util.text.splitLine(text);

    const usedLinks: LinkTextLink[] = [];

    return lines.map((line) => {
      let linkText = line;
      if (links) {
        for (const link of links) {
          if (usedLinks.includes(link)) {
            continue;
          }

          const texts = [link.text, ...link.subTexts];
          for (const replaceText of texts) {
            // renderText 에서 replaceText 찾아서 모두 [[[ | ]]] 로 감싸도록 변경
            linkText = linkText
              .split(/\[\[\[([^\]]+)\]\]\]/g)
              .map((v) => {
                if (v.startsWith('#') && v.includes('|')) {
                  return `[[[${v}]]]`;
                } else if (v.startsWith('**')) {
                  return `[[[${v}]]]`;
                } else {
                  if (v.includes(replaceText) && !usedLinks.includes(link)) {
                    usedLinks.push(link);
                    return v.replace(replaceText, `[[[#${link.text}|${replaceText}]]]`);
                  } else {
                    return v;
                  }
                }
              })
              .join('');
          }
        }
      }

      return {
        text: line,
        linkText: `${linkText}|||`,
      };
    });
  }, [text, links]);

  const contents = useMemo(() => {
    if (renderSentences) {
      const newContents: {type: 'default' | 'active'; text: string}[] = [];

      renderSentences.forEach((sentence) => {
        if (activeText) {
          if (sentence.text === activeText) {
            newContents.push({type: 'active', text: sentence.linkText});
          } else {
            newContents.push({type: 'default', text: sentence.linkText});
          }
        } else {
          newContents.push({type: 'default', text: sentence.linkText});
        }
      });

      return newContents.map((content) => {
        let renderText = content.text;
        if (accentTexts) {
          for (const accentText of accentTexts) {
            renderText = renderText
              .split(/\[\[\[([^\]]+)\]\]\]/g)
              .map((v) => {
                if (v.startsWith('#') && v.includes('|')) {
                  return `[[[${v}]]]`;
                } else if (v.startsWith('**')) {
                  return `[[[${v}]]]`;
                } else {
                  return v.replaceAll(accentText, `[[[**${accentText}]]]`);
                }
              })
              .join('');
          }
        }

        return {type: content.type, texts: renderText.split(/\[\[\[([^\]]+)\]\]\]/g)};
      });
    }
  }, [renderSentences, activeText, accentTexts]);

  const renderContents = useMemo(() => {
    if (contents) {
      return contents.map((content, idx) => (
        <React.Fragment key={idx}>
          {content.texts.map((t, idx2) => {
            let isLink = false;
            let linkText: string | undefined;
            let isAccent = false;
            let finalText: string;
            if (t.startsWith('#') && t.includes('|')) {
              const link = t.substring(1).split('|');
              isLink = true;
              linkText = link[0];
              finalText = link[1];
            } else if (t.startsWith('**')) {
              isAccent = true;
              finalText = t.substring(2);
            } else {
              finalText = t;
            }

            let endSpace = false;
            if (finalText.endsWith('|||')) {
              endSpace = idx < contents.length - 1;
              finalText = finalText.slice(0, -3);
            }

            let activeStyle: TextProps['style'] | undefined;
            if (content.type === 'active') {
              activeStyle = {
                // fontWeight: 'bold',
                // backgroundColor: '#e7ecff',
                backgroundColor: '#fffcd8',
              };
            }

            return (
              <React.Fragment key={`${idx}_${idx2}`}>
                {isLink && notEmpty(linkText) ? (
                  <T {...props} style={[style, activeStyle, linkStyle]} onPress={() => onLinkPress(linkText)}>
                    {finalText}
                  </T>
                ) : isAccent ? (
                  <T {...props} style={[style, activeStyle, accentStyle]}>
                    {finalText}
                  </T>
                ) : (
                  <T {...props} style={[style, activeStyle]}>
                    {finalText}
                  </T>
                )}
                {endSpace && ' '}
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ));
    }
  }, [accentStyle, contents, linkStyle, onLinkPress, props, style]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <T key={groupSeq} {...props}>
      {renderContents}
    </T>
  );
};

export default LinkText;
