/********************************************************************************************************************
 * 블러 효과가 적용된 View 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {BlurView as _BlurView} from '@react-native-community/blur';
import CustomComponent from '../../CustomComponent';
import {BlurViewProps as Props} from './BlurView.types';

const BlurView = ({blurType, blurAmount, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalBlurType = useMemo((): Props['blurType'] => {
    if (blurType === undefined) {
      return theme.dark ? 'dark' : 'light';
    } else {
      return blurType;
    }
  }, [blurType, theme]);

  const finalBlurAmount = useMemo(() => ifUndefined(blurAmount, 32), [blurAmount]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <CustomComponent
      component={_BlurView}
      blurType={finalBlurType}
      blurAmount={finalBlurAmount}
      overlayColor='transparent'
      {...props}
    />
  );
};

export default BlurView;
