import React from 'react';

const Tab3Home = LazyComponent(
  React.lazy(() => import('./Tab3Home')),
  {fullScreen: true},
);

export default Tab3Home;

export {Tab3Home};

export * from './Tab3Home.types';
