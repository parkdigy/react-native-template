/********************************************************************************************************************
 * Bullet 이 있는 값 목록 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {BulletValueListProps as Props} from './BulletValueList.types';

const BulletValueList = ({bulletProps, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const label = useMemo(
    () => <Icon name='circle-small' color={theme.colors.onSurface} size={16} {...bulletProps} />,
    [bulletProps, theme.colors.onSurface],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <ValueList label={label} {...props} />;
};

export default BulletValueList;
