import {type NativeStackHeaderProps} from '@react-navigation/native-stack';
import {type AppbarHeaderProps} from 'react-native-paper';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationOptions, type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type StackNavigationOptions, type StackNavigationProp} from '@react-navigation/stack';
import {type NavigationProp} from '@react-navigation/core';
import {type AppbarCommands, type AppbarProps} from '../Appbar';

export interface HeaderAppbarCommands extends AppbarCommands {}

export interface HeaderAppbarProps
  extends Pick<NativeStackHeaderProps, 'back' | 'route'>,
    Omit<AppbarHeaderProps, 'ref' | 'children'>,
    PartialPick<AppbarHeaderProps, 'children'>,
    Pick<AppbarProps, 'containerStyle' | 'blur' | 'subContent' | 'disabled' | 'hideTitle'> {
  ref?: Ref<HeaderAppbarCommands>;
  options: NativeStackNavigationOptions | StackNavigationOptions;
  navigation:
    | NativeStackNavigationProp<ParamListBase>
    | StackNavigationProp<ParamListBase>
    | NavigationProp<ReactNavigation.RootParamList>;
  height?: number;
  modalHeight?: number;
}
