import React from 'react';

const TermsOfPrivacy = LazyComponent(
  React.lazy(() => import('./TermsOfPrivacy')),
  {fullScreen: true},
);

export default TermsOfPrivacy;

export {TermsOfPrivacy};

export * from './TermsOfPrivacy.types';
