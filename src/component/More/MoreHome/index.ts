import React from 'react';

const MoreHome = LazyComponent(
  React.lazy(() => import('./MoreHome')),
  {fullScreen: true},
);

export default MoreHome;

export {MoreHome};

export * from './MoreHome.types';
