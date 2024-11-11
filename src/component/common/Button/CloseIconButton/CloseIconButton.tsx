import React from 'react';
import {IconButton} from 'react-native-paper';
import {IconClose} from '@asset-image';
import {CloseIconButtonProps as Props} from './CloseIconButton.types';

export const CloseIconButton = ({size = 20, iconColor, opacity, onPress}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const icon = useCallback(() => {
    return (
      <IconClose
        width={size}
        height={size}
        fill={ifUndefined(iconColor, theme.colors.onSurface)}
        strokeWidth={2}
        opacity={opacity}
      />
    );
  }, [iconColor, opacity, size, theme.colors.onSurface]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <IconButton icon={icon} size={size} accessibilityLabel='창 닫기' onPress={onPress} />;
};

export default CloseIconButton;
