import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import React from 'react';
import {IconProps as Props} from './Icon.types';

const Icon = (props: Props) => {
  return <VectorIcon {...props} />;
};

export default Icon;
