import React from 'react';

const ThemeSettingsScreen = LazyComponent(
  React.lazy(() => import('./ThemeSettingsScreen')),
  {fullScreen: true},
);

export default ThemeSettingsScreen;

export {ThemeSettingsScreen};
