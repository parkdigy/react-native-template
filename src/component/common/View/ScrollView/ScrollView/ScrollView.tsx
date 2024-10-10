import React from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView as NativeScrollView} from 'react-native-gesture-handler';
import CustomComponent from '../../../CustomComponent';
import {ScrollViewProps as Props} from './ScrollView.types';

const ScrollView = React.forwardRef<NativeScrollView, Props>(
  (
    {
      overflow = 'visible',
      animated,
      topBackgroundColor,
      keyboardDismissMode,
      keyboardShouldPersistTaps,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const {height: windowHeight} = useWindowDimensions();

    return (
      <CustomComponent
        ref={ref}
        overflow={overflow}
        component={animated ? Animated.ScrollView : NativeScrollView}
        keyboardDismissMode={ifUndefined(keyboardDismissMode, 'interactive')}
        keyboardShouldPersistTaps={ifUndefined(keyboardShouldPersistTaps, 'handled')}
        indicatorStyle={theme.dark ? 'white' : 'black'}
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
