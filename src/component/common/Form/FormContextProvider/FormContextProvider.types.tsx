import React, {RefObject} from 'react';

export interface FormContextProviderProps {
  children: React.ReactNode;
  parentScrollView?: RefObject<NativeScrollView>;
}
