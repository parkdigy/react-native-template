import React from 'react';
import {IconAngleRight} from '@asset-image';
import {Text_Default} from '../../Text';
import {PanelProps as Props} from './Panel.types';

const Panel = ({
  titleIcon,
  title,
  titleProps,
  itemPadding = px.s17,
  flat,
  children,
  backgroundColor,
  moreTitle,
  hideMoreIndicator,
  onMorePress,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View {...props}>
      <View borderRadius={flat ? 0 : 15} backgroundColor={ifUndefined(backgroundColor, theme.colors.surface)}>
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
                    <IconAngleRight fill={theme.colors.onSurface} width={px.s10} height={px.s10} />
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

            const {children: itemChildren, ...itemProps} = child.props;
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
