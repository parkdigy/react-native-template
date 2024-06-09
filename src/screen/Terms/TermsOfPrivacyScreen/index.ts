import React from 'react';

const TermsOfPrivacyScreen = LazyComponent(
  React.lazy(() => import('./TermsOfPrivacyScreen')),
  {fullScreen: true},
);

const TermsOfPrivacyFullScreen = LazyComponent(
  React.lazy(() => import('./TermsOfPrivacyFullScreen')),
  {fullScreen: true},
);

export {TermsOfPrivacyScreen, TermsOfPrivacyFullScreen};
