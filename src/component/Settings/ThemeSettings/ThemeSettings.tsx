import React from 'react';
import {useAppState} from '@context';
import {ThemeSettingsProps as Props} from './ThemeSettings.types';

export const ThemeSettings = ({}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {forceColorScheme, setForceColorScheme} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <ContainerScrollView>
      {/* 테마 */}
      <View>
        <Stack row center justifyContent={'space-between'} height={42}>
          <Text_Accent bold>시스템 설정 모드</Text_Accent>
          <TouchableOpacity p={10} onPress={() => setForceColorScheme('system')}>
            <RadioButton active={forceColorScheme === 'system'} />
          </TouchableOpacity>
        </Stack>
        <View mt={-6} pb={8}>
          <Text_Default s={12} lh={16}>
            시스템 디스플레이 설정에 따라
          </Text_Default>
          <Text_Default s={12} lh={16}>
            라이트/다크 모드로 자동 전환됩니다.
          </Text_Default>
        </View>

        <Stack row center justifyContent={'space-between'} height={42}>
          <Text_Accent bold>라이트 모드</Text_Accent>
          <TouchableOpacity p={10} onPress={() => setForceColorScheme('light')}>
            <RadioButton active={forceColorScheme === 'light'} />
          </TouchableOpacity>
        </Stack>

        <Stack row center justifyContent={'space-between'} height={42}>
          <Text_Accent bold>다크 모드</Text_Accent>
          <TouchableOpacity p={10} onPress={() => setForceColorScheme('dark')}>
            <RadioButton active={forceColorScheme === 'dark'} />
          </TouchableOpacity>
        </Stack>
      </View>
    </ContainerScrollView>
  );
};

export default ThemeSettings;
