import React from 'react';
import {IconAngleRight} from '@asset-image';
import {Text_Default} from '../../Text';
import {PanelItemProps as Props} from './PanelItem.types';

export const PanelItem = ({
  children,
  icon,
  iconSize = px.s20,
  iconColor,
  indicator,
  color: initColor,
  title,
  subTitle,
  subTitleOpacity = 0.7,
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
   * Memo
   * ******************************************************************************************************************/

  const content = useMemo(
    () =>
      (icon || title || subTitle || value || indicator) && (
        <Stack row center spacing={px.s10}>
          {icon && typeof icon === 'string' ? (
            <Icon name={icon} size={iconSize} color={ifUndefined(iconColor, theme.colors.onSurface)} />
          ) : (
            icon
          )}
          {(title || value) && (
            <Stack row center justifyContent='space-between' flex={1} spacing={px.s16}>
              <Stack flex={1} spacing={px.s5}>
                {title && (
                  <>
                    {typeof title === 'string' ? (
                      <Text_Default s={15} c={ifUndefined(initColor, theme.colors.onSurface)}>
                        {title}
                      </Text_Default>
                    ) : (
                      title
                    )}
                  </>
                )}
                {subTitle && (
                  <>
                    {typeof subTitle === 'string' ? (
                      <Text_Default s={12} opacity={subTitleOpacity}>
                        {subTitle}
                      </Text_Default>
                    ) : (
                      subTitle
                    )}
                  </>
                )}
              </Stack>
              {value && (
                <View>
                  {typeof value === 'string' ? (
                    <Text_Default s={12} opacity={0.8}>
                      {value}
                    </Text_Default>
                  ) : (
                    value
                  )}
                </View>
              )}
            </Stack>
          )}
          {indicator && (
            <View mv={px.s_10}>
              <IconAngleRight fill={theme.colors.textAccent} width={px.s10} height={px.s10} />
            </View>
          )}
        </Stack>
      ),
    [
      icon,
      iconColor,
      iconSize,
      indicator,
      initColor,
      subTitle,
      subTitleOpacity,
      theme.colors.onSurface,
      theme.colors.textAccent,
      title,
      value,
    ],
  );

  /********************************************************************************************************************
   * Variable
   * ******************************************************************************************************************/

  const finalChildren = (
    <View opacity={disabled ? 0.3 : 1}>
      {content}
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
