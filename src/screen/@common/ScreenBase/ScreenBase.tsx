/********************************************************************************************************************
 * ScreenBase 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {Button, SafeAreaView, View, Stack, SafeAreaViewProps} from '@ccomp';
import {ScreenBaseProps as Props} from './ScreenBase.types';
import {StackHeaderProps, StackNavigationOptions} from '@react-navigation/stack';

type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<infer TProps>
  ? TProps
  : TComponentOrTProps;

const ErrorFallback = (props: {error: Error; resetError: Function}) => {
  return (
    <View flex={1} alignItems={'center'} justifyContent={'center'} p={20}>
      <Stack spacing={20}>
        <View>
          <TGray center>예상치 못한 오류가 발생했습니다.</TGray>
          <TGray center>잠시 후 재시도 해주세요.</TGray>
        </View>
        <Button onPress={() => props.resetError()}>재시도</Button>
      </Stack>
    </View>
  );
};

function ScreenBase<C extends React.ComponentType<any>, CP = ExtractProps<C>>({
  title,
  header,
  navigation,
  route,
  component,
  componentProps,
  safeArea,
  topEdgeSafeArea,
  bottomEdgeSafeArea,
  safeAreaViewProps,
  transparent,
}: Props<C, CP>) {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  /** 최종 SafeAreaView 의 props */
  const finalSafeAreaViewProps: SafeAreaViewProps | undefined = useMemo(() => {
    if (topEdgeSafeArea && bottomEdgeSafeArea) {
      return {...safeAreaViewProps, edges: ['top', 'bottom']};
    } else if (topEdgeSafeArea) {
      return {...safeAreaViewProps, edges: ['top']};
    } else if (bottomEdgeSafeArea) {
      return {...safeAreaViewProps, edges: ['bottom']};
    } else {
      return safeAreaViewProps;
    }
  }, [bottomEdgeSafeArea, safeAreaViewProps, topEdgeSafeArea]);

  /********************************************************************************************************************
   * Header
   * ******************************************************************************************************************/

  const getHeader = useCallback(
    (props: StackHeaderProps) => {
      return header ? (
        <HeaderAppbar
          {...props}
          blur={contains(['blur', 'blur-hide-title'], header)}
          hideTitle={contains(['hide-title', 'blur-hide-title'], header)}
        />
      ) : null;
    },
    [header],
  );

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    const options: Partial<StackNavigationOptions> = {
      headerShown: !!header,
      header: (props) => getHeader(props),
    };
    if (title !== undefined) {
      options.title = title;
    }
    navigation.setOptions(options);
  }, [getHeader, header, navigation, title]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {safeArea || topEdgeSafeArea || bottomEdgeSafeArea ? (
        <SafeAreaView backgroundColor={transparent ? 'transparent' : undefined} {...finalSafeAreaViewProps}>
          {isIos ? (
            <View
              flex={1}
              marginTop={-200}
              paddingTop={200}
              backgroundColor={transparent ? 'transparent' : theme.colors.background}>
              {React.createElement(component, {navigation, route, ...componentProps})}
            </View>
          ) : (
            React.createElement(component, {navigation, route, ...componentProps})
          )}
        </SafeAreaView>
      ) : (
        React.createElement(component, {navigation, route, ...componentProps})
      )}
    </ErrorBoundary>
  );
}

export default ScreenBase;
