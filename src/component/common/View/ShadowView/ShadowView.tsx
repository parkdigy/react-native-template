import {type ShadowViewProps as Props} from './ShadowView.types';

const ShadowView = ({
  backgroundColor,
  shadowColor,
  shadowOpacity,
  shadowOffset,
  shadowRadius,
  elevation,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalBackgroundColor = useMemo(
    () => ifUndefined(backgroundColor, theme.colors.background),
    [backgroundColor, theme.colors.background],
  );

  const finalShadowColor = useMemo(
    () => ifUndefined(shadowColor, theme.colors.opacity20),
    [shadowColor, theme.colors.opacity20],
  );

  const finalShadowOpacity = useMemo(() => ifUndefined(shadowOpacity, 0.05), [shadowOpacity]);

  const finalShadowOffset = useMemo(() => ifUndefined(shadowOffset, {width: 0, height: 4}), [shadowOffset]);

  const finalShadowRadius = useMemo(() => ifUndefined(shadowRadius, 10), [shadowRadius]);

  const finalElevation = useMemo(() => ifUndefined(elevation, 1), [elevation]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View
      backgroundColor={finalBackgroundColor}
      shadowColor={finalShadowColor}
      shadowOpacity={finalShadowOpacity}
      shadowOffset={finalShadowOffset}
      shadowRadius={finalShadowRadius}
      elevation={finalElevation}
      {...props}
    />
  );
};

export default ShadowView;
