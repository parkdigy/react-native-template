import React from 'react';

const MoreHomeScreen = LazyComponent(
  React.lazy(() => import('./MoreHomeScreen')),
  {fullScreen: true},
);

export default MoreHomeScreen;

export {MoreHomeScreen};
