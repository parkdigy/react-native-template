/********************************************************************************************************************
 * 메인 탭 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {EventListenerCallback} from '@react-navigation/native';
import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {MainTabScreenList} from '@types';
import {useAppListener} from '@app';
import MainTabHomeStack from './MainTabHomeStack';
import MainTab1Stack from './MainTab1Stack';
import MainTab2Stack from './MainTab2Stack';
import MainTab3Stack from './MainTab3Stack';
import MainTabMoreStack from './MainTabMoreStack';

const Tab = createBottomTabNavigator<MainTabScreenList>();

const defaultTabScreenOptions: BottomTabNavigationOptions = {
  tabBarIconStyle: {marginTop: 2},
  tabBarLabelStyle: {fontWeight: '600', fontSize: 10, marginBottom: 1, paddingBottom: 2},
  headerShown: false,
};

const MainTab = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const lockScreen = useAppListener('lockScreen');

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const currentTabNameRef = useRef<keyof MainTabScreenList>('MainTabHome');

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const makeOptions = useCallback(
    (label: string, onIcon: ({focused}: {focused: boolean}) => React.ReactElement): BottomTabNavigationOptions => ({
      ...defaultTabScreenOptions,
      tabBarLabel: label,
      tabBarIcon: onIcon,
      tabBarStyle: {opacity: lockScreen ? 0.5 : 1},
    }),
    [lockScreen],
  );

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleHomeTabBarIcon = useCallback(
    ({focused}: {focused: boolean}) => (
      <Icon name='home' size={28} color={focused ? theme.colors.primaryAccent : theme.colors.onSurface} />
    ),
    [theme],
  );

  const handleTab1TabBarIcon = useCallback(
    ({focused}: {focused: boolean}) => (
      <Icon name='star-outline' size={28} color={focused ? theme.colors.primaryAccent : theme.colors.onSurface} />
    ),
    [theme],
  );

  const handleTab2TabBarIcon = useCallback(
    ({focused}: {focused: boolean}) => (
      <Icon
        name='plus-circle-outline'
        size={28}
        color={focused ? theme.colors.primaryAccent : theme.colors.onSurface}
      />
    ),
    [theme],
  );

  const handleTab3TabBarIcon = useCallback(
    ({focused}: {focused: boolean}) => (
      <Icon name='atom' size={28} color={focused ? theme.colors.primaryAccent : theme.colors.onSurface} />
    ),
    [theme],
  );

  const handleMoreTabBarIcon = useCallback(
    ({focused}: {focused: boolean}) => (
      <Icon name='dots-horizontal' size={28} color={focused ? theme.colors.primaryAccent : theme.colors.onSurface} />
    ),
    [theme],
  );

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const homeOptions: BottomTabNavigationOptions = useMemo(
    () => makeOptions('홈', handleHomeTabBarIcon),
    [handleHomeTabBarIcon, makeOptions],
  );

  const tab1Options: BottomTabNavigationOptions = useMemo(
    () => makeOptions('Tab 1', handleTab1TabBarIcon),
    [handleTab1TabBarIcon, makeOptions],
  );

  const tab2Options: BottomTabNavigationOptions = useMemo(
    () => makeOptions('Tab2', handleTab2TabBarIcon),
    [handleTab2TabBarIcon, makeOptions],
  );

  const tab3Options: BottomTabNavigationOptions = useMemo(
    () => makeOptions('Tab3', handleTab3TabBarIcon),
    [handleTab3TabBarIcon, makeOptions],
  );

  const myOptions: BottomTabNavigationOptions = useMemo(
    () => makeOptions('더보기', handleMoreTabBarIcon),
    [handleMoreTabBarIcon, makeOptions],
  );

  const listeners: {tabPress: EventListenerCallback<BottomTabNavigationEventMap, 'tabPress'>} = useMemo(
    () => ({
      tabPress: (e) => {
        if (lockScreen) {
          e.preventDefault();
        } else {
          if (e.target) {
            const newTabName = e.target.split('-')[0];
            if (newTabName === currentTabNameRef.current) {
              app.tabRePress(newTabName);
            }
            currentTabNameRef.current = newTabName as keyof MainTabScreenList;
          }
        }
      },
    }),
    [lockScreen],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Tab.Navigator
      initialRouteName={currentTabNameRef.current}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primaryAccent,
        tabBarHideOnKeyboard: Platform.OS === 'android',
      }}>
      <Tab.Screen name='MainTabHome' component={MainTabHomeStack} options={homeOptions} listeners={listeners} />
      <Tab.Screen name='MainTab1' component={MainTab1Stack} options={tab1Options} listeners={listeners} />
      <Tab.Screen name='MainTab2' component={MainTab2Stack} options={tab2Options} listeners={listeners} />
      <Tab.Screen name='MainTab3' component={MainTab3Stack} options={tab3Options} listeners={listeners} />
      <Tab.Screen name='MainTabMore' component={MainTabMoreStack} options={myOptions} listeners={listeners} />
    </Tab.Navigator>
  );
};

export default MainTab;
