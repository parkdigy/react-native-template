import React from 'react';
import {SafeAreaView as NativeSafeAreaView} from 'react-native-safe-area-context';
import CustomComponent from '../../CustomComponent';
import {SafeAreaViewProps as Props} from './SafeAreaView.types';

const SafeAreaView = ({flex, backgroundColor, transparent, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <CustomComponent
      component={NativeSafeAreaView}
      flex={ifUndefined(flex, 1)}
      backgroundColor={transparent ? 'transparent' : backgroundColor || theme.colors.background}
      {...props}
    />
  );
};

export default SafeAreaView;
