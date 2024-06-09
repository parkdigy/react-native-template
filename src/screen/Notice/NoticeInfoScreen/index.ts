import React from 'react';

const NoticeInfoScreen = LazyComponent(
  React.lazy(() => import('./NoticeInfoScreen')),
  {fullScreen: true},
);

export default NoticeInfoScreen;

export {NoticeInfoScreen};
