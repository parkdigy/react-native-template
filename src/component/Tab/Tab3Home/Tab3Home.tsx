import {type Tab3HomeProps as Props} from './Tab3Home.types';

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
          <PanelItem title='BackAlert'>
            <View pv={20} fullWidth>
              <BackAlert icon='no_data' text='검색된 정보가 없습니다.' noFullHeight retryButtonText='확인' />
            </View>
          </PanelItem>
        </Panel>

        <Panel>
          <PanelItem title='ApiErrorBackAlert'>
            <View pv={20} fullWidth>
              <ApiErrorBackAlert
                text={'정보를 불러올 수 없습니다.\n잠시 후 재시도 해주세요.'}
                noFullHeight
                onRetryPress={() => ll('BackAlert')}
              />
            </View>
          </PanelItem>
        </Panel>
      </Stack>
    </ContainerScrollView>
  );
};

export default Tab3Home;
