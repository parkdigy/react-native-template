import React from 'react';
import {Text_Default} from '@style';
import {PanelProps as Props} from './Panel.types';

const Panel = ({title, titleProps, itemPadding = 17, flat, children, moreTitle, onMorePress, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View {...props}>
      <View borderRadius={flat ? 0 : 15} backgroundColor={theme.colors.surface}>
        {title && (
          <Stack row center ph={itemPadding} pt={itemPadding} pb={8} fullWidth>
            <View flex={1}>
              <Text_Default s={17} w={700} {...titleProps}>
                {title}
              </Text_Default>
            </View>
            {moreTitle && onMorePress && (
              <TouchableOpacity opacity={0.6} mr={-5} onPress={onMorePress}>
                <Stack row center spacing={3}>
                  <Text_Default s={15} w={600}>
                    {moreTitle}
                  </Text_Default>
                  <Icon name='chevron-right' color={theme.colors.onSurface} size={22} />
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
