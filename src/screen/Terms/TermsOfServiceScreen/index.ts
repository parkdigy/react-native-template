import React from 'react';

const TermsOfServiceScreen = LazyComponent(
  React.lazy(() => import('./TermsOfServiceScreen')),
  {fullScreen: true},
);

const TermsOfServiceFullScreen = LazyComponent(
  React.lazy(() => import('./TermsOfServiceFullScreen')),
  {fullScreen: true},
);

export {TermsOfServiceScreen, TermsOfServiceFullScreen};
