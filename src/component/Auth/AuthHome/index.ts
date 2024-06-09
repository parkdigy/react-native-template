import React from 'react';

const AuthHome = LazyComponent(
  React.lazy(() => import('./AuthHome')),
  {fullScreen: true},
);

export default AuthHome;

export {AuthHome};

export * from './AuthHome.types';
