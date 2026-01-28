import React from 'react';
import {Text_Default} from '../../Text';
import {type PanelProps as Props} from './Panel.types';
import LinearGradient from 'react-native-linear-gradient';
import {ColorButtonColors} from '../../Button/ColorButton';
import {type PanelItemProps} from '../PanelItem';
import {type PanelDividerProps} from '../PanelDivider';

const Panel = ({
  titleIcon,
  title,
  titleProps,
  itemPadding = px.s17,
  flat,
  children,
  backgroundColor,
  borderWidth,
  borderColor,
  borderRadius = 15,
  moreTitle,
  hideMoreIndicator,
  gradientBorderColor = 'jshine',
  gradientBorderWidth,
  onMorePress,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  const [loadGradientBorder, setLoadGradientBorder] = useState(false);
  const [gradientBorderMargin, setGradientBorderMargin] = useState(0);
  const [showGradientBorder, setShowGradientBorder] = useState(false);

  /********************************************************************************************************************
   * Changed
   * ******************************************************************************************************************/

  useChanged(() => {
    if (gradientBorderWidth) {
      setLoadGradientBorder(true);
      setGradientBorderMargin(-gradientBorderWidth);
      setShowGradientBorder(true);
    } else {
      setShowGradientBorder(false);
    }
  }, [gradientBorderWidth]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View {...props}>
      {loadGradientBorder && (
        <View
          animation={showGradientBorder ? 'fadeIn' : 'fadeOut'}
          duration={1000}
          style={{
            position: 'absolute',
            left: gradientBorderMargin,
            right: gradientBorderMargin,
            top: gradientBorderMargin,
            bottom: gradientBorderMargin,
            borderRadius: flat ? 0 : borderRadius,
            overflow: 'hidden',
          }}
          onAnimationEnd={() => {
            if (!showGradientBorder) {
              setLoadGradientBorder(false);
            }
          }}>
          <LinearGradient
            colors={ColorButtonColors[gradientBorderColor]}
            useAngle
            angle={150}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{flex: 1}}
          />
        </View>
      )}

      <View
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderRadius={flat ? 0 : borderRadius}
        backgroundColor={ifUndefined(backgroundColor, theme.colors.surface)}>
        {title && (
          <Stack row center ph={itemPadding} pt={itemPadding} pb={0} fullWidth>
            <View flex={1}>
              <Stack row center spacing={px.s8}>
                {titleIcon}
                <Text_Default s={16} bold c={theme.colors.panelTitle} {...titleProps}>
                  {title}
                </Text_Default>
              </Stack>
            </View>
            {moreTitle && onMorePress && (
              <TouchableOpacity
                m={px.s_10}
                mr={hideMoreIndicator ? -10 : -15}
                p={px.s10}
                accessibilityLabel={`${title} ${moreTitle}`}
                onPress={onMorePress}>
                <Stack row center spacing={px.s3}>
                  <Text_Default s={13} opacity={0.6}>
                    {moreTitle}
                  </Text_Default>
                  {!hideMoreIndicator && (
                    <Icon
                      name='chevron-forward'
                      color={theme.colors.onSurface}
                      size={px.s15}
                      style={{opacity: 0.5, marginRight: 3}}
                    />
                  )}
                </Stack>
              </TouchableOpacity>
            )}
          </Stack>
        )}

        {React.Children.map(util.react.removeFragment(children), (child, idx) => {
          if (React.isValidElement(child)) {
            if (child.type !== PanelItem && child.type !== PanelDivider) {
              throw new Error('Panel 에는 PanelItem, PanelDivider 만 포함될 수 있습니다.');
            }

            let itemProps: PanelItemProps | PanelDividerProps | undefined;
            let itemChildren: ReactNode | undefined;

            if (child.type === PanelItem) {
              const {children: panelItemChildren, ...panelItemProps} = child.props as PanelItemProps;
              itemProps = panelItemProps;
              itemChildren = panelItemChildren;
            } else if (child.type === PanelDivider) {
              itemProps = child.props as PanelDividerProps;
            }

            return (
              <View key={idx}>
                {child.type === PanelItem ? (
                  <PanelItem p={itemPadding} {...itemProps}>
                    {itemChildren}
                  </PanelItem>
                ) : (
                  <View ph={itemPadding}>{child}</View>
                )}
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

export default Panel;
