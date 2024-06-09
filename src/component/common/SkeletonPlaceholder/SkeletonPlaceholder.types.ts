import {ReactElement} from 'react';

export interface SkeletonPlaceholderProps {
  children: ReactElement;
  backgroundColor?: string;
  highlightColor?: string;
  enabled?: boolean;
  speed?: number;
}
