import React from 'react';

const NoticeListScreen = LazyComponent(
  React.lazy(() => import('./NoticeListScreen')),
  {fullScreen: true},
);

export default NoticeListScreen;

export {NoticeListScreen};
