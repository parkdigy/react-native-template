import React from 'react';
import {Pressable as _Pressable} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {PressableProps as Props} from './Pressable.types';

const Pressable = (props: Props) => {
  return <CustomComponent component={_Pressable} {...props} />;
};

export default Pressable;
