import React from 'react';

const AuthHomeScreen = LazyComponent(
  React.lazy(() => import('./AuthHomeScreen')),
  {fullScreen: true},
);

export default AuthHomeScreen;

export {AuthHomeScreen};
