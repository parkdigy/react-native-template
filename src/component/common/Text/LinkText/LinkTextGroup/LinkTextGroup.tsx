import {type LinkTextGroupProps as Props} from './LinkTextGroup.types';
import LinkTextGroupContext from './LinkTextGroupContext';
import {type LinkTextLink} from '../LinkText/LinkText.types';

export const LinkTextGroup = ({groupId, links, children}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const [, setUpdateLinksTimeout] = useTimeoutRef();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const lastGroupIdRef = useRef<string>(groupId);

  const infoRef = useRef<
    Dict<
      Dict<{
        text: string;
        listeners: {
          onLinks(links: LinkTextLink[] | undefined): void;
        };
      }>
    >
  >({[`${groupId}`]: {}});

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEventEffect(() => {
    if (groupId !== lastGroupIdRef.current) {
      delete infoRef.current[lastGroupIdRef.current];
      infoRef.current[groupId] = {};
      lastGroupIdRef.current = groupId;
    }
  }, [groupId]);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const updateLinks = useCallback(() => {
    const groupInfo = infoRef.current[groupId];
    if (groupInfo) {
      const groupSeqList = Object.keys(groupInfo).map((key) => Number(key));
      groupSeqList.sort((a, b) => a - b);
      const usedLinks: LinkTextLink[] = [];
      groupSeqList.forEach((groupSeq) => {
        const groupSeqInfo = groupInfo[groupSeq];
        if (groupSeqInfo) {
          const {text, listeners} = groupSeqInfo;

          if (links) {
            const useLinks: LinkTextLink[] = [];

            for (const link of links) {
              if (!usedLinks.includes(link)) {
                if ([link.text, ...link.subTexts].find((linkText) => text.includes(linkText))) {
                  useLinks.push(link);
                  usedLinks.push(link);
                }
              }
            }

            listeners.onLinks(useLinks);
          } else {
            listeners.onLinks(undefined);
          }
        }
      });
    }
  }, [groupId, links]);

  /********************************************************************************************************************
   * Context Value Function
   * ******************************************************************************************************************/

  const register = useCallback(
    (
      groupSeq: number,
      text: string,
      listeners: {
        onLinks(links: LinkTextLink[]): void;
      },
    ) => {
      infoRef.current[groupId][groupSeq] = {text, listeners};
      setUpdateLinksTimeout(() => {
        updateLinks();
      }, 100);
    },
    [groupId, setUpdateLinksTimeout, updateLinks],
  );

  const unregister = useCallback(
    (groupSeq: number) => {
      if (infoRef.current[groupId] && infoRef.current[groupId][groupSeq]) {
        delete infoRef.current[groupId][groupSeq];
      }
    },
    [groupId],
  );

  /********************************************************************************************************************
   * Context Value
   * ******************************************************************************************************************/

  const contextValue = useMemo(() => ({groupId, register, unregister}), [groupId, register, unregister]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <LinkTextGroupContext.Provider value={contextValue}>{children}</LinkTextGroupContext.Provider>;
};

export default LinkTextGroup;
