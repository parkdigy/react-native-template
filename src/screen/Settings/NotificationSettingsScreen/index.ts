import React from 'react';

const NotificationSettingsScreen = LazyComponent(
  React.lazy(() => import('./NotificationSettingsScreen')),
  {fullScreen: true},
);

export default NotificationSettingsScreen;

export {NotificationSettingsScreen};
