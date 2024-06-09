import React from 'react';

const TermsOfService = LazyComponent(
  React.lazy(() => import('./TermsOfService')),
  {fullScreen: true},
);

export default TermsOfService;

export {TermsOfService};

export * from './TermsOfService.types';
