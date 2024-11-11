import React from 'react';
import {Text_Accent} from '../../Text';
import TopContainerView from '../../View/TopContainerView';
import HomeTitleRight from '../HomeTitleRight';
import {HomeTitleProps as Props} from './HomeTitle.types';

const HomeTitle = ({children, right, inTopContainer, ...props}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const content = useMemo(
    () => (
      <Stack row center>
        <View flex={1}>
          {typeof children === 'string' ? (
            <Text_Accent s={18} lh={30}>
              {children}
            </Text_Accent>
          ) : (
            children
          )}
        </View>
        {right ? (
          <Stack row center spacing={5}>
            {right}
          </Stack>
        ) : (
          <HomeTitleRight />
        )}
      </Stack>
    ),
    [children, right],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return inTopContainer ? (
    <View pv={10} {...props}>
      {content}
    </View>
  ) : (
    <TopContainerView inSafeArea show noAnimation pv={10} {...props}>
      {content}
    </TopContainerView>
  );
};

export default HomeTitle;
