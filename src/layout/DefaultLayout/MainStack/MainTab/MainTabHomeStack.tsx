/********************************************************************************************************************
 * 홈 탭 컴포넌트
 * ******************************************************************************************************************/

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTabHomeScreenList, type ScreenProps} from '@types';
import {HomeScreen} from '@screen';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<MainTabHomeScreenList>();

const MainTabHomeStack = ({}: ScreenProps) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={commonStackNavigationOptions}>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainTabHomeStack;
