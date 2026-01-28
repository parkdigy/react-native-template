import {type ScreenProps} from '@types';
import {AuthSignIn} from '@comp';
import {ScreenBase} from '../@common';

export const AuthSignInScreen = ({navigation, route}: ScreenProps<'AuthSignIn'>) => {
  /********************************************************************************************************************
   * LayoutEffect
   * ******************************************************************************************************************/

  useLayoutEffect(() => {
    navigation.setOptions({title: '로그인'});
  }, [navigation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ScreenBase header={false} component={AuthSignIn} navigation={navigation} transparent route={route} />;
};

export default AuthSignInScreen;
