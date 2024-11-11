import React from 'react';
import {Text_Accent, Text_Right100} from '../../Text';
import {LabelValueListProps as Props} from './LabelValueList.types';

const LabelValueList = ({size, labelWidth, items, ...props}: Props) => {
  return items ? (
    <Stack {...props}>
      {items.map((info, idx) => (
        <Stack row center key={idx} alignItems='flex-start'>
          {notEmpty(info.label) && (
            <View width={labelWidth}>
              {typeof info.label === 'string' ? <Text_Right100 size={size}>{info.label}</Text_Right100> : info.label}
            </View>
          )}

          <View flex={1}>
            {typeof info.value === 'string' ? <Text_Accent size={size}>{info.value}</Text_Accent> : info.value}
          </View>
        </Stack>
      ))}
    </Stack>
  ) : null;
};

export default LabelValueList;
