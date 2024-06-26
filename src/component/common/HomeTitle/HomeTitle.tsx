import React from 'react';
import {IconButton} from 'react-native-paper';
import Config from 'react-native-config';
import {useAppState} from '@context';
import {Text_Accent} from '@style';
import {HomeTitleProps as Props} from './HomeTitle.types';

const HomeTitle = ({children, right}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {colorScheme, setColorScheme} = useAppState();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack row center>
      <View flex={1}>
        <Text_Accent s={22} w={800} lh={30}>
          {children}
        </Text_Accent>
      </View>
      {(Config.APP_ENV !== 'production' || right) && (
        <Stack row center spacing={5}>
          {Config.APP_ENV !== 'production' && (
            <IconButton
              icon='compare'
              size={20}
              iconColor={theme.colors.textAccent}
              onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
            />
          )}
          {right}
        </Stack>
      )}
    </Stack>
  );
};

export default HomeTitle;
