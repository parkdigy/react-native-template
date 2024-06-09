import React from 'react';

const Tab3HomeScreen = LazyComponent(
  React.lazy(() => import('./Tab3HomeScreen')),
  {fullScreen: true},
);

export default Tab3HomeScreen;

export {Tab3HomeScreen};
