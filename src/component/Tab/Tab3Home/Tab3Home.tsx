import React from 'react';
import {Tab3HomeProps as Props} from './Tab3Home.types';

export const Tab3Home = ({}: Props) => {
  return (
    <ContainerScrollView>
      <Stack spacing={10}>
        <Panel>
          <PanelItem title='BackAlert'>
            <View pv={20} fullWidth>
              <BackAlert
                icon='info'
                text='확인 버튼을 눌러주세요.'
                noFullHeight
                retryButtonText='확인'
                onRetryPress={() => ll('BackAlert')}
              />
            </View>
          </PanelItem>
        </Panel>

        <Panel>
          <PanelItem title='ApiErrorBackAlert'>
            <View pv={20} fullWidth>
              <ApiErrorBackAlert text='오류가 발생했습니다.' noFullHeight onRetryPress={() => ll('BackAlert')} />
            </View>
          </PanelItem>
        </Panel>
      </Stack>
    </ContainerScrollView>
  );
};

export default Tab3Home;
