import React from 'react';

const Home = LazyComponent(
  React.lazy(() => import('./Home')),
  {fullScreen: true},
);

export default Home;

export {Home};

export * from './Home.types';
