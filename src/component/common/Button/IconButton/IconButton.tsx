import React from 'react';
import {IconButtonProps as Props} from './IconButton.types';
import {IconButton as _IconButton} from 'react-native-paper';
import CustomComponent from '../../CustomComponent';

export const IconButton = ({name, color, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const renderIcon = useCallback(
    (iconProps: any) => <Icon name={name} {...iconProps} color={ifUndefined(color, theme.colors.onSurface)} />,
    [color, name, theme.colors.onSurface],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <CustomComponent component={_IconButton} icon={renderIcon} {...props} />;
};

export default IconButton;
