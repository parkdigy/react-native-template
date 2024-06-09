/********************************************************************************************************************
 * ScreenBase 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {Button, SafeAreaView, Text, View, Stack, SafeAreaViewProps} from '@ccomp';
import {ScreenBaseProps as Props} from './ScreenBase.types';

type ExtractProps<TComponentOrTProps> =
  TComponentOrTProps extends React.ComponentType<infer TProps> ? TProps : TComponentOrTProps;

const ErrorFallback = (props: {error: Error; resetError: Function}) => {
  return (
    <View flex={1} alignItems={'center'} justifyContent={'center'} p={20}>
      <Stack spacing={20}>
        <View>
          <Text textAlign='center' color='gray'>
            예상치 못한 오류가 발생했습니다.
          </Text>
          <Text textAlign='center' color='gray'>
            잠시 후 재시도 해주세요.
          </Text>
        </View>
        <Button onPress={() => props.resetError()}>재시도</Button>
      </Stack>
    </View>
  );
};

function ScreenBase<C extends React.ComponentType<any>, CP = ExtractProps<C>>({
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
    if (topEdgeSafeArea) {
      return {...safeAreaViewProps, edges: ['top']};
    } else if (bottomEdgeSafeArea) {
      return {...safeAreaViewProps, edges: ['bottom']};
    } else {
      return safeAreaViewProps;
    }
  }, [bottomEdgeSafeArea, safeAreaViewProps, topEdgeSafeArea]);

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
