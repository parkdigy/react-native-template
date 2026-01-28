import LinearGradient, {type LinearGradientProps} from 'react-native-linear-gradient';
import {ColorButtonColors, type ColorButtonProps as Props} from './ColorButton.types';

const ColorButton = ({
  size = 'medium',
  color = 'blue_violet',
  labelAlign = 'center',
  icon,
  iconSize,
  iconRight,
  disabled,
  loading,
  children,
  hideLabel,
  labelMinWidth,
  flex,
  height,
  rotateBackground,
  extraPaddingLeft = 0,
  extraPaddingRight = 0,
  angle = 45,
  angleCenter = {x: 0.5, y: 0.5},
  borderRadius = 999,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  paddingHorizontal: initPaddingHorizontal,
  ml,
  mr,
  mt,
  mb,
  mh,
  mv,
  hitSlop,
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
        newPaddingHorizontal = ifUndefined(initPaddingHorizontal, 10);
        newSpacing = 5;
        break;
      case 'small':
        newFontSize = 14;
        newLineHeight = 19;
        newMarginVertical = 11;
        newPaddingHorizontal = ifUndefined(initPaddingHorizontal, 25);
        newSpacing = 10;
        break;
      case 'medium':
        newFontSize = 15;
        newLineHeight = 21;
        newMarginVertical = 13;
        newPaddingHorizontal = ifUndefined(initPaddingHorizontal, 30);
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
  }, [height, initPaddingHorizontal, size]);

  const gradientStyle = useMemo<LinearGradientProps['style']>(
    () => ({
      width,
      height: width,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    }),
    [borderBottomLeftRadius, borderBottomRightRadius, borderRadius, borderTopLeftRadius, borderTopRightRadius, width],
  );

  const iconContent = useMemo(() => {
    if (icon) {
      const s = ifUndefined(iconSize, fontSize * 1.2);
      if (typeof icon === 'string') {
        return <Icon name={icon} color={'white'} size={s} />;
      } else {
        const IconComponent = icon;
        return <IconComponent fill={'white'} width={s} height={s} />;
      }
    }
  }, [fontSize, icon, iconSize]);

  /********************************************************************************************************************
   * Content
   * ******************************************************************************************************************/

  const content = useMemo(
    () => (
      <>
        {loading && !iconRight && <ActivityIndicator size={ifUndefined(iconSize, fontSize * 1.2)} color='#fff' />}
        {!loading && !iconRight && iconContent}
        {!hideLabel && (
          <T
            c={'white'}
            minWidth={labelMinWidth}
            size={fontSize}
            lineHeight={lineHeight}
            bold
            marginVertical={marginVertical}>
            {children}
          </T>
        )}
        {loading && iconRight && <ActivityIndicator size={ifUndefined(iconSize, fontSize * 1.2)} color='#fff' />}
        {!loading && iconRight && iconContent}
      </>
    ),
    [
      children,
      fontSize,
      hideLabel,
      iconContent,
      iconRight,
      iconSize,
      labelMinWidth,
      lineHeight,
      loading,
      marginVertical,
    ],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      flex={flex}
      ml={ml}
      mr={mr}
      mt={mt}
      mb={mb}
      mh={mh}
      mv={mv}
      hitSlop={hitSlop}
      opacity={disabled ? 0.5 : 1}>
      <View
        center
        height={height}
        overflow='hidden'
        borderRadius={borderRadius}
        borderTopLeftRadius={borderTopLeftRadius}
        borderTopRightRadius={borderTopRightRadius}
        borderBottomLeftRadius={borderBottomLeftRadius}
        borderBottomRightRadius={borderBottomRightRadius}
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
