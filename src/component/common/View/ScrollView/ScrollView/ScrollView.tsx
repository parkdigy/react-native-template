import React from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView as NativeScrollView} from 'react-native-gesture-handler';
import CustomComponent from '../../../CustomComponent';
import {ScrollViewProps as Props} from './ScrollView.types';

const ScrollView = React.forwardRef<NativeScrollView, Props>(
  (
    {
      animated,
      topBackgroundColor,
      keyboardDismissMode,
      keyboardShouldPersistTaps,
      children,
      contentInset,
      safeAreaInsetTop,
      ...props
    },
    ref,
  ) => {
    /********************************************************************************************************************
     * Use
     * ******************************************************************************************************************/

    const theme = useTheme();
    const {height: windowHeight} = useWindowDimensions();
    const safeAreaInset = useSafeAreaInsets();

    /********************************************************************************************************************
     * Memo
     * ******************************************************************************************************************/

    const finalContentInset: Props['contentInset'] | undefined = useMemo(() => {
      if (safeAreaInsetTop) {
        return {
          top: safeAreaInset.top,
          bottom: contentInset?.bottom ?? 0,
          left: contentInset?.left ?? 0,
          right: contentInset?.right ?? 0,
        };
      } else {
        return contentInset;
      }
    }, [contentInset, safeAreaInset.top, safeAreaInsetTop]);

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <CustomComponent
        ref={ref}
        component={animated ? Animated.ScrollView : NativeScrollView}
        keyboardDismissMode={ifUndefined(keyboardDismissMode, 'interactive')}
        keyboardShouldPersistTaps={ifUndefined(keyboardShouldPersistTaps, 'handled')}
        indicatorStyle={theme.dark ? 'white' : 'black'}
        contentInset={finalContentInset}
        {...props}>
        {topBackgroundColor !== undefined && (
          <View
            backgroundColor={theme.colors.surface}
            position='absolute'
            left={0}
            right={0}
            height={windowHeight}
            top={-windowHeight}
          />
        )}
        {children}
      </CustomComponent>
    );
  },
);

export default ScrollView;
