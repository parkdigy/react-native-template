import React from 'react';

const NoticeInfo = LazyComponent(
  React.lazy(() => import('./NoticeInfo')),
  {fullScreen: true},
);

export default NoticeInfo;

export {NoticeInfo};

export * from './NoticeInfo.types';
