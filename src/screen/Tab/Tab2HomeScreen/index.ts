import React from 'react';

const Tab2HomeScreen = LazyComponent(
  React.lazy(() => import('./Tab2HomeScreen')),
  {fullScreen: true},
);

export default Tab2HomeScreen;

export {Tab2HomeScreen};
