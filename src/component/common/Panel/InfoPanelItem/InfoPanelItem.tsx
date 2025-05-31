import React from 'react';
import {Text_Default} from '../../Text';
import {InfoPanelItemProps as Props} from './InfoPanelItem.types';

export const InfoPanelItem = ({children, ...props}: Props) => {
  return (
    <View {...props}>
      <Stack row spacing={3}>
        <Icon name='ellipse' size={5} />
        <View flex={1}>{typeof children === 'string' ? <Text_Default>{children}</Text_Default> : children}</View>
      </Stack>
    </View>
  );
};

export default InfoPanelItem;
