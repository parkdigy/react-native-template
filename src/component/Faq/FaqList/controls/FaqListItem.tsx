/********************************************************************************************************************
 * FAQ 목록 아이템 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {FaqListDataItem} from '@const';
import {Text_Accent_L20, Text_Primary100_L20, Text_Primary_W600} from '@style';

interface Props {
  info: FaqListDataItem;
  active: boolean;
  onPress(info: FaqListDataItem): void;
}

const FaqListItem = ({info, active, onPress}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handlePress = useCallback(() => {
    onPress && onPress(info);
  }, [info, onPress]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View mt={-1}>
      <View borderTopWidth={1} borderTopColor={theme.dark ? '#222324' : '#E7E9EC'} />
      <TouchableOpacity pv={20} onPress={handlePress}>
        <Stack row spacing={10}>
          <Icon name='alpha-q-circle' size={23} color={theme.colors.textRight100} />
          <Text_Accent_L20 flex={1}>
            <Text_Primary_W600>[{info.category}]</Text_Primary_W600> {info.title}
          </Text_Accent_L20>
          <View mr={-3}>
            <Icon name={active ? 'chevron-down' : 'chevron-up'} size={20} color={theme.colors.primary200} />
          </View>
        </Stack>
      </TouchableOpacity>
      {active && (
        <View>
          <Stack row ph={16} pv={20} spacing={10} backgroundColor={theme.colors.bgAppList}>
            <Icon name='alpha-a-circle' size={23} color={theme.colors.primary} />
            <Text_Primary100_L20 flex={1}>{info.content}</Text_Primary100_L20>
          </Stack>
        </View>
      )}
      <View borderTopWidth={1} borderTopColor={theme.dark ? '#222324' : '#E7E9EC'} />
    </View>
  );
};

export default FaqListItem;
