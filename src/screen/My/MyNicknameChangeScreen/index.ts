import React from 'react';

const MyNicknameChangeScreen = LazyComponent(
  React.lazy(() => import('./MyNicknameChangeScreen')),
  {fullScreen: true},
);

export default MyNicknameChangeScreen;

export {MyNicknameChangeScreen};
