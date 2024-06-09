import React from 'react';
import {Text_Right100} from '@style';
import {PanelItemProps as Props} from './PanelItem.types';

export const PanelItem = ({
  children,
  icon,
  iconSize = 20,
  indicator,
  color: initColor,
  value,
  onPress,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Variable
   * ******************************************************************************************************************/

  const color = ifUndefined(initColor, theme.colors.textAccent);

  const finalChildren = (
    <Stack row center spacing={10}>
      {icon && <Icon name={icon} size={iconSize} color={color} />}
      <Stack row center justifyContent='space-between' flex={1} spacing={16}>
        <View flex={1}>{typeof children === 'string' ? <Text color={color}>{children}</Text> : children}</View>
        {value && <View>{typeof value === 'string' ? <Text_Right100>{value}</Text_Right100> : value}</View>}
      </Stack>
      {indicator && (
        <View mr={-5}>
          <Icon name='chevron-right' size={20} color={theme.colors.textRight200} />
        </View>
      )}
    </Stack>
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return onPress ? (
    <TouchableOpacity onPress={onPress} {...props}>
      {finalChildren}
    </TouchableOpacity>
  ) : (
    <View {...props}>{finalChildren}</View>
  );
};

export default PanelItem;
