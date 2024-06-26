import React from 'react';
import {Text_13_W600} from '@style';
import {PanelValueListProps as Props} from './PanelValueList.types';

const LineHeight = 16.8;

const PanelValueList = ({title, titleColor: initTitleColor, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Variable
   * ******************************************************************************************************************/

  const titleColor = ifUndefined(initTitleColor, theme.colors.primary);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Panel>
      <PanelItem>
        <Stack spacing={12}>
          <Stack row spacing={5}>
            <Stack center minWidth={12} height={LineHeight}>
              <Icon name='information' color={titleColor} size={LineHeight} />
            </Stack>
            <Text_13_W600 flex={1} color={titleColor} lineHeight={LineHeight}>
              {title}
            </Text_13_W600>
          </Stack>
          {props.items && (
            <BulletValueList
              spacing={6}
              pl={10}
              bulletProps={{style: {marginTop: 6}}}
              valueTextProps={{size: 'sm', lineHeight: LineHeight}}
              {...props}
            />
          )}
        </Stack>
      </PanelItem>
    </Panel>
  );
};

PanelValueList.LineHeight = LineHeight;

export default PanelValueList;
