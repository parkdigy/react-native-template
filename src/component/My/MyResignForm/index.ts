import React from 'react';

const MyResignForm = LazyComponent(
  React.lazy(() => import('./MyResignForm')),
  {fullScreen: true},
);

export default MyResignForm;

export {MyResignForm};

export * from './MyResignForm.types';
