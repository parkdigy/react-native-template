import {useContext} from 'react';
import LinkTextGroupContext, {LinkTextGroupContextValue} from './LinkTextGroupContext';

export function useLinkTextGroupState(): LinkTextGroupContextValue | undefined {
  return useContext(LinkTextGroupContext);
}

export default useLinkTextGroupState;
