import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTab2ScreenList, type ScreenProps} from '@types';
import {Tab2HomeScreen} from '@screen';
import {useAppState} from '@context';

const Stack = createNativeStackNavigator<MainTab2ScreenList>();

const MainTab2Stack = ({}: ScreenProps) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {commonStackNavigationOptions} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack.Navigator initialRouteName='Tab2Home' screenOptions={commonStackNavigationOptions}>
      <Stack.Screen name='Tab2Home' component={Tab2HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainTab2Stack;
