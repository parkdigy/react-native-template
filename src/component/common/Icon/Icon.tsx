import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import React from 'react';
import {IconProps as Props} from './Icon.types';

const Icon = ({color, ...props}: Props) => {
  const theme = useTheme();

  const finalColor = useMemo(() => {
    if (color !== undefined) {
      switch (color) {
        case 'primary':
          return theme.colors.primary;
        case 'primary100':
          return theme.colors.primary100;
        case 'primary200':
          return theme.colors.primary200;
        case 'primary300':
          return theme.colors.primary300;
        case 'primary400':
          return theme.colors.primary400;
        case 'primary500':
          return theme.colors.primary500;
        case 'primaryAccent':
          return theme.colors.primaryAccent;
        case 'info':
          return theme.colors.primary;
        case 'secondary':
          return theme.colors.secondary;
        case 'tertiary':
          return theme.colors.tertiary;
        case 'success':
          return theme.colors.success;
        case 'warning':
          return theme.colors.warning;
        case 'error':
          return theme.colors.error;
        case 'blueGray':
          return theme.colors.blueGray;
        case 'accent':
          return theme.colors.textAccent;
        case 'right100':
          return theme.colors.textRight100;
        case 'right200':
          return theme.colors.textRight200;
        case 'green100':
          return theme.colors.green100;
        case 'green200':
          return theme.colors.green200;
        case 'green300':
          return theme.colors.green300;
        case 'green400':
          return theme.colors.green400;
        case 'yellow':
          return theme.colors.yellow;
        default:
          return color;
      }
    } else {
      return theme.colors.onSurface;
    }
  }, [color, theme]);

  return <VectorIcon color={finalColor} {...props} />;
};

export default React.memo(Icon);
