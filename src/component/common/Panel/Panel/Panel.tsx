import React from 'react';
import {Text_Accent_W600} from '@style';
import {PanelProps as Props} from './Panel.types';

const Panel = ({title, itemPadding = 16, children, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  let lastIndex = 0;
  if (children) {
    React.Children.forEach(children, (child, idx) => {
      if (React.isValidElement(child)) {
        if (child.type !== PanelItem) {
          throw new Error('Panel 에는 PanelItem 만 포함될 수 있습니다.');
        }
        lastIndex = idx;
      }
    });
  }

  return (
    <View {...props}>
      {title && (
        <Text_Accent_W600 lineHeight={16} mb={16}>
          {title}
        </Text_Accent_W600>
      )}
      <ShadowView borderRadius={10} backgroundColor={theme.colors.bgPrimary}>
        {React.Children.map(removeReactFragment(children), (child, idx) => {
          if (React.isValidElement(child)) {
            const {children: itemChildren, ...itemProps} = child.props;
            return (
              <View key={idx}>
                <PanelItem p={itemPadding} {...itemProps}>
                  {itemChildren}
                </PanelItem>
                {idx !== lastIndex && <View borderTopWidth={1} borderTopColor={theme.colors.background} />}
              </View>
            );
          }
        })}
      </ShadowView>
    </View>
  );
};

export default Panel;
