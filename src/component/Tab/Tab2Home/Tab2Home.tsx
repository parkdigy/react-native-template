import React from 'react';
import {Tab2HomeProps as Props} from './Tab2Home.types';

export const Tab2Home = ({}: Props) => {
  return (
    <ContainerScrollView>
      <Stack spacing={10}>
        <Panel>
          <PanelItem title={'PanelItem - title'} />
          <PanelItem title={'PanelItem - color'} color='primary' />
          <PanelItem title={'PanelItem - subTitle'} subTitle={'subTitle'} />
          <PanelItem title={'PanelItem - subTitle - subTitleOpacity'} subTitle={'subTitle'} subTitleOpacity={0.5} />
        </Panel>
        <Panel>
          <PanelItem title={'PanelItem - icon'} icon='cog' />
          <PanelItem title={'PanelItem - icon - iconColor'} icon='bag' iconColor='primary' />
          <PanelItem title={'PanelItem - icon - iconSize'} icon='bag' iconSize={30} />
        </Panel>
        <Panel>
          <PanelItem title={'PanelItem - indicator'} indicator />
          <PanelItem title={'PanelItem - value'} value={'value'} />
          <PanelItem title={'PanelItem - value - indicator'} value={'value'} indicator />
        </Panel>
        <Panel>
          <PanelItem title={'PanelItem - disabled'} disabled />
        </Panel>
      </Stack>
    </ContainerScrollView>
  );
};

export default Tab2Home;
