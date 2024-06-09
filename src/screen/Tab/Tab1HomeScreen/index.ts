import React from 'react';

const Tab1HomeScreen = LazyComponent(
  React.lazy(() => import('./Tab1HomeScreen')),
  {fullScreen: true},
);

export default Tab1HomeScreen;

export {Tab1HomeScreen};
