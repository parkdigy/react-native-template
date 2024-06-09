import React from 'react';

const MyNicknameChange = LazyComponent(React.lazy(() => import('./MyNicknameChange')));

export default MyNicknameChange;

export {MyNicknameChange};

export * from './MyNicknameChange.types';
