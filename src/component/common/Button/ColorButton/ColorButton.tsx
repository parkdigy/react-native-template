import React from 'react';
import LinearGradient, {LinearGradientProps} from 'react-native-linear-gradient';
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
  angle = 45,
  angleCenter = {x: 0.5, y: 0.5},
  onPress,
  onLongPress,
  onLayout,
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

  const gradientStyle = useMemo<LinearGradientProps['style']>(
    () => ({width, height: width, borderRadius: 999}),
    [width],
  );

  const iconContent = useMemo(() => {
    if (icon) {
      const size = ifUndefined(iconSize, fontSize * 1.2);
      if (typeof icon === 'string') {
        return <Icon name={icon} color={'white'} size={size} />;
      } else {
        const IconComponent = icon;
        return <IconComponent fill={'white'} width={size} height={size} />;
      }
    }
  }, [fontSize, icon, iconSize]);

  /********************************************************************************************************************
   * Content
   * ******************************************************************************************************************/

  const content = useMemo(
    () => (
      <>
        {!iconRight && iconContent}
        {!hideLabel && (
          <T c={'white'} size={fontSize} lineHeight={lineHeight} bold marginVertical={marginVertical}>
            {children}
          </T>
        )}
        {iconRight && iconContent}
      </>
    ),
    [children, fontSize, hideLabel, iconContent, iconRight, lineHeight, marginVertical],
  );

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
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
          onLayout?.(e);
        }}>
        <View
          key={width}
          position='absolute'
          animation={rotateBackground ? 'rotate' : 'none'}
          easing='linear'
          iterationCount='infinite'
          duration={5000}>
          <LinearGradient colors={colors} useAngle angle={angle} angleCenter={angleCenter} style={gradientStyle} />
        </View>
        <Stack
          row
          center
          spacing={spacing}
          pl={paddingHorizontal + extraPaddingLeft}
          pr={paddingHorizontal + extraPaddingRight}
          justifyContent={labelAlign === 'left' ? 'flex-start' : labelAlign === 'right' ? 'flex-end' : 'center'}>
          {content}
        </Stack>
      </View>
    </TouchableOpacity>
  );
};

export default ColorButton;
