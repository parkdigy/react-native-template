import React from 'react';

const Tab2Home = LazyComponent(
  React.lazy(() => import('./Tab2Home')),
  {fullScreen: true},
);

export default Tab2Home;

export {Tab2Home};

export * from './Tab2Home.types';
