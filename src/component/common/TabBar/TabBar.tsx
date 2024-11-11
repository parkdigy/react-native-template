import React from 'react';
import {Text_Default} from '../Text';
import {TabBarProps as Props, TabBarItemValue} from './TabBar.types';

function TabBar<T extends TabBarItemValue>({mode: initMode, items, value: initValue, onChange, ...props}: Props<T>) {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [value, setValue] = useState(initValue);
  const [mode, setMode] = useState<'default' | 'angled'>(initMode || 'default');

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    setMode(initMode || 'default');
  }, [initMode]);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    if (value !== undefined) {
      onChange?.(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return items ? (
    <Stack row position='relative'>
      {items.map((info) => {
        const active = info.value === value;

        return (
          <Pressable
            key={info.value}
            flex={1}
            alignItems='center'
            justifyContent='center'
            disabled={info.disabled}
            accessibilityLabel={info.label}
            {...props}
            onPress={() => setValue(info.value)}>
            {mode === 'default' ? (
              <View pt={12} alignItems='center' opacity={info.disabled ? 0.5 : 1}>
                <View flexDirection='row' pb={14} position='relative'>
                  <Stack row center spacing={8}>
                    {active && info.activeIcon ? info.activeIcon : info.icon}
                    <Text_Default c={active ? 'primary' : undefined} bold={active}>
                      {info.label}
                    </Text_Default>
                  </Stack>
                  {active && (
                    <View
                      position='absolute'
                      height={4}
                      left={-8}
                      right={-8}
                      bottom={0}
                      backgroundColor={theme.colors.primary}
                      borderTopLeftRadius={5}
                      borderTopRightRadius={5}
                    />
                  )}
                </View>
              </View>
            ) : (
              <View
                width='100%'
                alignItems='center'
                justifyContent='center'
                p={8}
                opacity={info.disabled ? 0.5 : 1}
                backgroundColor={active ? 'transparent' : theme.colors.opacity05}
                borderTopColor={active ? theme.colors.primary200 : 'transparent'}
                borderTopWidth={1}
                borderLeftColor={theme.colors.primary200}
                borderLeftWidth={active ? 1 : 0}
                borderRightColor={theme.colors.primary200}
                borderRightWidth={active ? 1 : 0}
                borderBottomColor={active ? 'transparent' : theme.colors.primary200}
                borderBottomWidth={1}>
                <Stack row center spacing={8}>
                  {active && info.activeIcon ? info.activeIcon : info.icon}
                  <Text_Default c={active ? 'primary100' : 'primary200'}>{info.label}</Text_Default>
                </Stack>
              </View>
            )}
          </Pressable>
        );
      })}
      {mode === 'default' && (
        <View
          borderBottomWidth={1}
          borderBottomColor={theme.colors.opacity05}
          position='absolute'
          left={0}
          right={0}
          bottom={0}
        />
      )}
    </Stack>
  ) : null;
}

export default TabBar;
