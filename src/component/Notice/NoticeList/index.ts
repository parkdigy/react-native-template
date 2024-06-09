import React from 'react';

const NoticeList = LazyComponent(
  React.lazy(() => import('./NoticeList')),
  {fullScreen: true},
);

export default NoticeList;

export {NoticeList};

export * from './NoticeList.types';
