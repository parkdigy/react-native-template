import React from 'react';
import {Text_Default} from '@style';
import {PanelItemProps as Props} from './PanelItem.types';

export const PanelItem = ({
  children,
  icon,
  iconSize = 20,
  iconColor,
  indicator,
  color: initColor,
  title,
  subTitle,
  value,
  disabled,
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

  const titleColor = ifUndefined(initColor, subTitle ? theme.colors.white : theme.colors.onSurface);
  const titleFontWeight = subTitle ? 700 : 400;

  const finalChildren = (
    <View opacity={disabled ? 0.3 : 1}>
      {(icon || title || subTitle || value || indicator) && (
        <Stack row center spacing={10}>
          {icon && <Icon name={icon} size={iconSize} color={ifUndefined(iconColor, theme.colors.onSurface)} />}
          {(title || value) && (
            <Stack row center justifyContent='space-between' flex={1} spacing={16}>
              <Stack flex={1} spacing={5}>
                {title && (
                  <>
                    {typeof title === 'string' ? (
                      <Text_Default s={15} color={titleColor} fontWeight={titleFontWeight}>
                        {title}
                      </Text_Default>
                    ) : (
                      title
                    )}
                  </>
                )}
                {subTitle && (
                  <>{typeof subTitle === 'string' ? <Text_Default s={12}>{subTitle}</Text_Default> : subTitle}</>
                )}
              </Stack>
              {value && <View>{typeof value === 'string' ? <Text_Default s={13}>{value}</Text_Default> : value}</View>}
            </Stack>
          )}
          {indicator && (
            <View mr={-5} mv={-10}>
              <Icon name='chevron-right' size={20} color={theme.colors.textRight100} />
            </View>
          )}
        </Stack>
      )}
      {children}
    </View>
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return onPress && !disabled ? (
    <TouchableOpacity onPress={onPress} {...props}>
      {finalChildren}
    </TouchableOpacity>
  ) : (
    <View {...props}>{finalChildren}</View>
  );
};

export default PanelItem;
