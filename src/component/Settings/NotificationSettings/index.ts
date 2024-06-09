import React from 'react';

const NotificationSettings = LazyComponent(
  React.lazy(() => import('./NotificationSettings')),
  {fullScreen: true},
);

export default NotificationSettings;

export {NotificationSettings};

export * from './NotificationSettings.types';
