import React from 'react';
import {LinkTextProps as Props} from './LinkText.types';

const groupIdTime: Dict<number> = {};
const groupIdCount: Dict<number> = {};
const groupUsedWords: Dict<string[]> = {};

export const LinkText = ({
  group,
  text,
  links,
  style,
  linkStyle,
  accentTexts,
  accentStyle,
  activeText,
  onLinkPress,
  ...props
}: Props) => {
  useLayoutEffect(() => {
    if (group?.id) {
      return () => {
        groupIdCount[group.id] = (groupIdCount[group.id] || 0) - 1;
        if (groupIdCount[group.id] <= 0) {
          delete groupIdCount[group.id];
          delete groupIdTime[group.id];
          delete groupUsedWords[group.id];
        }
      };
    }
  }, [group?.id]);

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const lastGroupIdRef = useRef<string>(undefined);

  const groupSeq = useMemo(() => {
    if (lastGroupIdRef.current) {
      groupIdCount[lastGroupIdRef.current] = (groupIdCount[lastGroupIdRef.current] || 0) - 1;
      if (groupIdCount[lastGroupIdRef.current] <= 0) {
        delete groupIdCount[lastGroupIdRef.current];
        delete groupIdTime[lastGroupIdRef.current];
        delete groupUsedWords[lastGroupIdRef.current];
      }
    }
    if (group?.id) {
      const newGroupIdCount = (groupIdCount[group.id] || 0) + 1;
      if (group.seq === 1) {
        groupUsedWords[group.id] = [];
      }
      groupIdCount[group.id] = newGroupIdCount;
      return newGroupIdCount;
    }

    lastGroupIdRef.current = group?.id;
  }, [group?.id, group?.seq]);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const contents = useMemo(() => {
    const newContents: {type: 'default' | 'active'; text: string}[] = [];

    if (activeText) {
      if (text.includes(activeText)) {
        const splitActiveText = text.split(activeText);
        if (notEmpty(splitActiveText[0])) {
          newContents.push({type: 'default', text: splitActiveText[0]});
        }
        newContents.push({type: 'active', text: activeText});
        if (notEmpty(splitActiveText[1])) {
          newContents.push({type: 'default', text: splitActiveText[1]});
        }
      } else {
        newContents.push({type: 'default', text});
      }
    } else {
      newContents.push({type: 'default', text});
    }

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

      const usedWords: string[] = group?.id ? groupUsedWords[group.id] : [];
      for (const link of links) {
        const texts = [link.text, ...link.subTexts];
        for (const replaceText of texts) {
          // renderText 에서 replaceText 찾아서 모두 [[[ | ]]] 로 감싸도록 변경
          renderText = renderText
            .split(/\[\[\[([^\]]+)\]\]\]/g)
            .map((v) => {
              if (v.startsWith('#') && v.includes('|')) {
                return `[[[${v}]]]`;
              } else if (v.startsWith('**')) {
                return `[[[${v}]]]`;
              } else {
                if (usedWords.includes(replaceText)) {
                  return v; // 이미 사용된 단어는 변경하지 않음
                } else {
                  if (v.includes(replaceText)) {
                    usedWords.push(replaceText);
                    return v.replace(replaceText, `[[[#${link.text}|${replaceText}]]]`);
                  } else {
                    return v;
                  }
                }
              }
            })
            .join('');
        }
      }

      return {type: content.type, texts: renderText.split(/\[\[\[([^\]]+)\]\]\]/g)};
    });
  }, [activeText, text, accentTexts, group?.id, links]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <T key={groupSeq} {...props}>
      {contents.map((content, idx) => (
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

            let activeStyle: TextProps['style'] | undefined;
            if (content.type === 'active') {
              activeStyle = {
                // fontWeight: 'bold',
                // backgroundColor: '#e7ecff',
                backgroundColor: '#fffcd8',
              };
            }

            return isLink && notEmpty(linkText) ? (
              <T
                key={`${idx}_${idx2}`}
                {...props}
                style={[style, activeStyle, linkStyle]}
                onPress={() => onLinkPress(linkText)}>
                {finalText}
              </T>
            ) : isAccent ? (
              <T key={`${idx}_${idx2}`} {...props} style={[style, activeStyle, accentStyle]}>
                {finalText}
              </T>
            ) : (
              <T key={`${idx}_${idx2}`} {...props} style={[style, activeStyle]}>
                {finalText}
              </T>
            );
          })}
        </React.Fragment>
      ))}
    </T>
  );
};

export default LinkText;
