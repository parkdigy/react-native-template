import React from 'react';

const FaqListScreen = LazyComponent(
  React.lazy(() => import('./FaqListScreen')),
  {fullScreen: true},
);

export default FaqListScreen;

export {FaqListScreen};
