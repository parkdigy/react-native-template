import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {AppbarHeaderProps} from 'react-native-paper';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationOptions, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import {NavigationProp} from '@react-navigation/core';
import {AppbarCommands, AppbarProps} from '../Appbar';

export interface HeaderAppbarCommands extends AppbarCommands {}

export interface HeaderAppbarProps
  extends Pick<NativeStackHeaderProps, 'back' | 'route'>,
    Omit<AppbarHeaderProps, 'ref' | 'children'>,
    PartialPick<AppbarHeaderProps, 'children'>,
    Pick<AppbarProps, 'containerStyle' | 'blur' | 'subContent' | 'disabled'> {
  options: NativeStackNavigationOptions | StackNavigationOptions;
  navigation:
    | NativeStackNavigationProp<ParamListBase>
    | StackNavigationProp<ParamListBase>
    | NavigationProp<ReactNavigation.RootParamList>;
  height?: number;
  modalHeight?: number;
}
