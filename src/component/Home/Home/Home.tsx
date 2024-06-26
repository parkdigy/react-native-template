/********************************************************************************************************************
 * 홈 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {HomeProps as Props} from './Home.types';

const Home = ({}: Props) => {
  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <ContainerScrollView overflow='hidden'>
      <Stack spacing={24}>
        <HomeTitle>Home</HomeTitle>
      </Stack>
    </ContainerScrollView>
  );
};

export default Home;
