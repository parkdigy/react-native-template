import React from 'react';
import {Text_Primary_W600} from '@style';
import {InfoPanelProps as Props} from './InfoPanel.types';

export const InfoPanel = ({title, children, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Panel {...props}>
      <PanelItem>
        <Stack spacing={10}>
          {title && (
            <Stack row spacing={5}>
              <Stack center minWidth={12}>
                <Icon name='information' color={theme.colors.primary} size={16} />
              </Stack>
              <Text_Primary_W600 flex={1}>{title}</Text_Primary_W600>
            </Stack>
          )}
          <Stack spacing={5}>
            {React.Children.map(util.react.removeFragment(children), (child, idx) => {
              if (React.isValidElement(child)) {
                if (child.type !== InfoPanelItem) {
                  throw new Error('InfoPanel 에는 InfoPanelItem 만 포함될 수 있습니다.');
                }

                const {children: itemChildren, ...itemProps} = child.props;
                return (
                  <View key={idx}>
                    <InfoPanelItem {...itemProps}>{itemChildren}</InfoPanelItem>
                  </View>
                );
              }
            })}
          </Stack>
        </Stack>
      </PanelItem>
    </Panel>
  );
};

export default InfoPanel;
