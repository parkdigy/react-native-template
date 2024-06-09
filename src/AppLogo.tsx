import React from 'react';
import {Logo} from '@image';

interface Props {
  onAnimationComplete?(): void;
}

// let __isFirstLoad = true;

export const AppLogo = ({onAnimationComplete}: Props) => {
  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    onAnimationComplete && onAnimationComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <Logo width={100} height={100} />;

  // /********************************************************************************************************************
  //  * Ref
  //  * ******************************************************************************************************************/
  //
  // // 로고 Flip 애니메이션
  // const flipAnimation = useRef(new Animated.Value(0)).current;
  //
  // /********************************************************************************************************************
  //  * Memo
  //  * ******************************************************************************************************************/
  //
  // const style = useMemo(
  //   () =>
  //     isAndroid
  //       ? {
  //           transform: [
  //             {
  //               translateY: flipAnimation.interpolate({
  //                 inputRange: [0, 1],
  //                 outputRange: [0, -20],
  //               }),
  //             },
  //           ],
  //         }
  //       : undefined,
  //   [flipAnimation],
  // );
  //
  // /********************************************************************************************************************
  //  * Effect
  //  * ******************************************************************************************************************/
  //
  // /** 로고 Flip 애니메이션 실행 */
  // useEffect(() => {
  //   if (isAndroid && __isFirstLoad) {
  //     __isFirstLoad = false;
  //
  //     Animated.timing(flipAnimation, {
  //       delay: 300,
  //       toValue: 1,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       onAnimationComplete && onAnimationComplete();
  //     });
  //   } else {
  //     onAnimationComplete && onAnimationComplete();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [flipAnimation]);
  //
  // /********************************************************************************************************************
  //  * Render
  //  * ******************************************************************************************************************/
  //
  // return isAndroid ? (
  //   <View animated style={style}>
  //     <SplashLogo fill='white' width={100} height={100} />
  //   </View>
  // ) : (
  //   <SplashLogo fill='white' width={100} height={100} />
  // );
};

export type TAppLogo = typeof AppLogo;

export default AppLogo;
