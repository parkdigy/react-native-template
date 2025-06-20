import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorButtonProps as Props} from './ColorButton.types';

const ColorButton = ({size = 'medium', color = 'deep_blue', labelAlign = 'center', icon, children, onPress}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const colors = useMemo(() => {
    switch (color) {
      case 'purple_violet':
        return ['#8E2DE2', '#4A00E0']; // 보라 계열 그라디언트
      case 'violet_pink':
        return ['#dd467c', '#a22ff4']; // 분홍 보라 느낌
      case 'pink_dark_green':
        return ['#D4145A', '#1E3C72']; // 분홍에서 딥 그린으로
      case 'blue_violet':
        return ['#a02ff6', '#4570ef']; // 파랑+보라
      case 'blue_marine':
        return ['#00d2ff', '#3a7bd5']; // 청록+파랑
      case 'deep_blue':
        return ['#5671bd', '#253580'];
      case 'grey':
        return ['#bdc3c7', '#6a6a6a']; // 회색 계열
    }
  }, [color]);

  const {fontSize, lineHeight, marginVertical} = useMemo(() => {
    let newFontSize: number;
    let newLineHeight: number;
    let newMarginVertical: number;
    switch (size) {
      case 'small':
        newFontSize = 14;
        newLineHeight = 19;
        newMarginVertical = 11;
        break;
      case 'medium':
        newFontSize = 15;
        newLineHeight = 21;
        newMarginVertical = 13;
        break;
      case 'large':
        newFontSize = 16;
        newLineHeight = 23;
        newMarginVertical = 15;
        break;
    }
    return {fontSize: newFontSize, lineHeight: newLineHeight, marginVertical: newMarginVertical};
  }, [size]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient colors={colors} useAngle angle={45} angleCenter={{x: 0.5, y: 0.5}} style={styles.linearGradient}>
        <Stack
          row
          center
          justifyContent={labelAlign === 'left' ? 'flex-start' : labelAlign === 'right' ? 'flex-end' : 'center'}>
          {icon && <Icon name={icon} color={'white'} size={fontSize * 1.2} />}
          {typeof children === 'string' ? (
            <T
              style={styles.buttonText}
              c={'white'}
              size={fontSize}
              lineHeight={lineHeight}
              bold
              marginVertical={marginVertical}>
              {children}
            </T>
          ) : (
            children
          )}
        </Stack>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ColorButton;

/********************************************************************************************************************
 * Styled Components
 * ******************************************************************************************************************/

var styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 999,
  },
  buttonText: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
