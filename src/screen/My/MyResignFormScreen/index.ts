import React from 'react';

const MyResignFormScreen = LazyComponent(
  React.lazy(() => import('./MyResignFormScreen')),
  {fullScreen: true},
);

export default MyResignFormScreen;

export {MyResignFormScreen};
