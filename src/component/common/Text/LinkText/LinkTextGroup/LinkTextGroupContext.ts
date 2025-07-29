import {createContext} from 'react';
import {LinkTextLink} from '../LinkText/LinkText.types';

export interface LinkTextGroupContextValue {
  groupId: string;
  register(
    groupSeq: number,
    text: string,
    listeners: {
      onLinks(links: LinkTextLink[] | undefined): void;
    },
  ): void;
  unregister(groupSeq: number): void;
}

const LinkTextGroupContext = createContext<LinkTextGroupContextValue | undefined>(undefined);

export default LinkTextGroupContext;
