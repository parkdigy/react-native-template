import React from 'react';
import {Text_Default} from '../../Text';
import {ListViewItemProps as Props} from './ListViewItem.types';
import styled from 'styled-components/native';

const ListViewItem = ({
  children,
  activeOpacity = 1,
  trailingText,
  trailingIcon,
  trailingIconName = 'chevron-forward',
  trailingIconSize = 17,
  trailingIconColor = '#afafaf',
  onPress,
  padding,
  paddingBottom,
  paddingEnd,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
  paddingStart,
  paddingTop,
  paddingVertical,
}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const style = useMemo(() => {
    const newStyle: Record<string, any> = {};
    padding !== undefined && (newStyle.padding = padding);
    paddingBottom !== undefined && (newStyle.paddingBottom = paddingBottom);
    paddingEnd !== undefined && (newStyle.paddingEnd = paddingEnd);
    paddingHorizontal !== undefined && (newStyle.paddingHorizontal = paddingHorizontal);
    paddingLeft !== undefined && (newStyle.paddingLeft = paddingLeft);
    paddingRight !== undefined && (newStyle.paddingRight = paddingRight);
    paddingStart !== undefined && (newStyle.paddingStart = paddingStart);
    paddingTop !== undefined && (newStyle.paddingTop = paddingTop);
    paddingVertical !== undefined && (newStyle.paddingVertical = paddingVertical);
    return newStyle;
  }, [
    padding,
    paddingBottom,
    paddingEnd,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingStart,
    paddingTop,
    paddingVertical,
  ]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <StyledContainerTouchableOpacity activeOpacity={activeOpacity} style={style} onPress={onPress}>
      <View flex={1}>{children}</View>
      {/*<View style={{backgroundColor: 'word'}}>{children}</View>*/}
      {(trailingText || trailingIcon) && (
        <Stack row ml={10} spacing={7} center>
          {trailingText && (
            <Text_Default s={12} opacity={0.5} textAlign='right'>
              {trailingText}
            </Text_Default>
          )}
          {trailingIcon && trailingIconName && (
            <Icon name={trailingIconName} size={trailingIconSize} color={trailingIconColor} />
          )}
        </Stack>
      )}
    </StyledContainerTouchableOpacity>
  );
};

export default ListViewItem;

/********************************************************************************************************************
 * Styled Components
 * ******************************************************************************************************************/

export const StyledContainerTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 20px 15px;
`;
