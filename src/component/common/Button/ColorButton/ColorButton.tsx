import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorButtonColors, ColorButtonProps as Props} from './ColorButton.types';

const ColorButton = ({
  size = 'medium',
  color = 'blue_violet',
  labelAlign = 'center',
  icon,
  iconSize,
  iconRight,
  disabled,
  children,
  hideLabel,
  flex,
  height,
  rotateBackground,
  extraPaddingLeft = 0,
  extraPaddingRight = 0,
  onPress,
  onLongPress,
}: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [width, setWidth] = useState(0);

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const colors = useMemo(() => {
    return ColorButtonColors[color];
  }, [color]);

  const {fontSize, lineHeight, marginVertical, paddingHorizontal, spacing} = useMemo(() => {
    let newFontSize: number;
    let newLineHeight: number;
    let newMarginVertical: number;
    let newPaddingHorizontal: number;
    let newSpacing: number;

    switch (size) {
      case 'x-small':
        newFontSize = 12;
        newLineHeight = 20;
        newMarginVertical = 6;
        newPaddingHorizontal = 10;
        newSpacing = 5;
        break;
      case 'small':
        newFontSize = 14;
        newLineHeight = 19;
        newMarginVertical = 11;
        newPaddingHorizontal = 25;
        newSpacing = 10;
        break;
      case 'medium':
        newFontSize = 15;
        newLineHeight = 21;
        newMarginVertical = 13;
        newPaddingHorizontal = 30;
        newSpacing = 10;
        break;
      case 'large':
        newFontSize = 16;
        newLineHeight = 23;
        newMarginVertical = 15;
        newPaddingHorizontal = 30;
        newSpacing = 10;
        break;
    }
    return {
      fontSize: newFontSize,
      lineHeight: newLineHeight,
      marginVertical: height === undefined ? newMarginVertical : 0,
      paddingHorizontal: newPaddingHorizontal,
      spacing: newSpacing,
    };
  }, [height, size]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      flex={flex}
      opacity={disabled ? 0.5 : 1}>
      <View
        center
        height={height}
        overflow='hidden'
        borderRadius={999}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        <View
          key={width}
          position='absolute'
          animation={rotateBackground ? 'rotate' : 'none'}
          easing='linear'
          iterationCount='infinite'
          duration={5000}>
          <LinearGradient
            colors={colors}
            useAngle
            angle={45}
            angleCenter={{x: 0.5, y: 0.5}}
            style={[{width: width, height: width, borderRadius: 999}, styles.linearGradient]}
          />
        </View>
        <Stack
          row
          center
          spacing={spacing}
          pl={paddingHorizontal + extraPaddingLeft}
          pr={paddingHorizontal + extraPaddingRight}
          justifyContent={labelAlign === 'left' ? 'flex-start' : labelAlign === 'right' ? 'flex-end' : 'center'}>
          {icon && !iconRight && <Icon name={icon} color={'white'} size={ifUndefined(iconSize, fontSize * 1.2)} />}
          {!hideLabel && (
            <T c={'white'} size={fontSize} lineHeight={lineHeight} bold marginVertical={marginVertical}>
              {children}
            </T>
          )}
          {icon && iconRight && <Icon name={icon} color={'white'} size={ifUndefined(iconSize, fontSize * 1.2)} />}
        </Stack>
      </View>
    </TouchableOpacity>
  );
};

export default ColorButton;

/********************************************************************************************************************
 * Styled Components
 * ******************************************************************************************************************/

var styles = StyleSheet.create({
  linearGradient: {
    // position: 'absolute',
    // borderRadius: 9999,
    // transform: [{rotate: '34deg'}],
  },
});
