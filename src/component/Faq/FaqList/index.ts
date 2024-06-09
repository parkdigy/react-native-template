import React from 'react';

const FaqList = LazyComponent(
  React.lazy(() => import('./FaqList')),
  {fullScreen: true},
);

export default FaqList;

export {FaqList};

export * from './FaqList.types';
