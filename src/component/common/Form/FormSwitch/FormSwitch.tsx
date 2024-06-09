import React from 'react';
import {Switch} from 'react-native-paper';
import {FormSwitchProps as Props} from './FormSwitch.types';

const FormSwitch = (props: Props) => {
  return <Switch {...props} />;
};

export default FormSwitch;
