import React from 'react';

const ThemeSettings = LazyComponent(
  React.lazy(() => import('./ThemeSettings')),
  {fullScreen: true},
);

export default ThemeSettings;

export {ThemeSettings};

export * from './ThemeSettings.types';
