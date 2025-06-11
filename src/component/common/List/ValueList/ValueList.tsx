/********************************************************************************************************************
 * 값 목록 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {Text_Default} from '../../Text';
import {ValueListProps as Props} from './ValueList.types';

const ValueList = ({label, items, centerVertical, valueTextProps, ...props}: Props) => {
  return (
    <Stack {...props}>
      {items &&
        items.map((v, idx) =>
          typeof v === 'string' ? (
            <Stack row center={centerVertical} spacing={8} key={idx}>
              {label && <View>{label}</View>}
              <View flex={1}>
                <Text_Default {...valueTextProps}>{v}</Text_Default>
              </View>
            </Stack>
          ) : (
            <Stack row center={centerVertical} spacing={8} key={idx}>
              {label && <View>{label}</View>}
              <View flex={1}>{v}</View>
            </Stack>
          ),
        )}
    </Stack>
  );
};

export default ValueList;
