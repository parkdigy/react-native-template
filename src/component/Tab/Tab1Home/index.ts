import React from 'react';

const Tab1Home = LazyComponent(
  React.lazy(() => import('./Tab1Home')),
  {fullScreen: true},
);

export default Tab1Home;

export {Tab1Home};

export * from './Tab1Home.types';
