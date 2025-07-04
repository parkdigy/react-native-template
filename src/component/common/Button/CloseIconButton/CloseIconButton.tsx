import React from 'react';
import {IconButton} from 'react-native-paper';
import {CloseIconButtonProps as Props} from './CloseIconButton.types';

export const CloseIconButton = ({size = px.s30, iconColor, opacity, onPress}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const icon = useCallback(() => {
    return <Icon name='close' size={size} color={ifUndefined(iconColor, theme.colors.onSurface)} style={{opacity}} />;
  }, [iconColor, opacity, size, theme.colors.onSurface]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <IconButton icon={icon} size={size} accessibilityLabel='창 닫기' onPress={onPress} />;
};

export default CloseIconButton;
