import React from 'react';
import {InfoPanelItemProps as Props} from './InfoPanelItem.types';

export const InfoPanelItem = ({children, ...props}: Props) => {
  const theme = useTheme();

  return (
    <View {...props}>
      <Stack row spacing={3}>
        <Icon name='circle-small' color={theme.colors.onSurface} size={16} />
        <View flex={1}>{typeof children === 'string' ? <Text>{children}</Text> : children}</View>
      </Stack>
    </View>
  );
};

export default InfoPanelItem;
