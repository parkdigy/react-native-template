/********************************************************************************************************************
 * 홈 화면 컴포넌트
 * ******************************************************************************************************************/

import {type HomeProps as Props} from './Home.types';

const Home = ({}: Props) => {
  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <ContainerScrollView>
      <Stack spacing={10}>
        {/* Button */}
        <Panel>
          <PanelItem>
            <Stack spacing={10}>
              <Stack row center spacing={10}>
                <Button flex={1}>Button</Button>
                <Button flex={1} color='primary'>
                  primary
                </Button>
              </Stack>
              <Stack row center spacing={10}>
                <Button flex={1} color='primary100'>
                  primary100
                </Button>
                <Button flex={1} color='primary200'>
                  primary200
                </Button>
              </Stack>
              <Stack row center spacing={10}>
                <Button flex={1} color='primary300'>
                  primary300
                </Button>
                <Button flex={1} color='primary400'>
                  primary400
                </Button>
              </Stack>
              <Stack row center spacing={10}>
                <Button flex={1} color='primary500'>
                  primary500
                </Button>
                <Button flex={1} color='secondary'>
                  secondary
                </Button>
              </Stack>
              <Stack row center spacing={10}>
                <Button flex={1} color='tertiary'>
                  tertiary
                </Button>
                <Button flex={1} color='success'>
                  success
                </Button>
              </Stack>
              <Stack row center spacing={10}>
                <Button flex={1} color='warning'>
                  warning
                </Button>
                <Button flex={1} color='error'>
                  error
                </Button>
              </Stack>
              <Stack row center spacing={10}>
                <Button flex={1} color='info'>
                  info
                </Button>
                <Button flex={1} color='gray'>
                  gray
                </Button>
              </Stack>
              <Stack row center spacing={10}>
                <Button flex={1} color='blueGray'>
                  blueGray
                </Button>
                <Button flex={1} color='purple'>
                  purple
                </Button>
              </Stack>
              <Stack row center spacing={10}>
                <Button flex={1} color='white'>
                  white
                </Button>
              </Stack>
            </Stack>
          </PanelItem>
        </Panel>

        {/* ColorButton */}
        <Panel>
          <PanelItem>
            <Stack spacing={10}>
              <Stack row center spacing={10}>
                <ColorButton size='small' flex={1}>
                  ColorButton
                </ColorButton>
                <ColorButton size='small' flex={1} color='jshine'>
                  jshine
                </ColorButton>
              </Stack>
              <Stack row center spacing={10}>
                <ColorButton size='small' flex={1} color='purple_violet'>
                  purple_violet
                </ColorButton>
                <ColorButton size='small' flex={1} color='violet_pink'>
                  violet_pink
                </ColorButton>
              </Stack>
              <Stack row center spacing={10}>
                <ColorButton size='small' flex={1} color='pink_dark_green'>
                  pink_dark_green
                </ColorButton>
                <ColorButton size='small' flex={1} color='blue_violet'>
                  blue_violet
                </ColorButton>
              </Stack>
              <Stack row center spacing={10}>
                <ColorButton size='small' flex={1} color='blue_marine'>
                  blue_marine
                </ColorButton>
                <ColorButton size='small' flex={1} color='deep_blue'>
                  deep_blue
                </ColorButton>
              </Stack>
              <Stack row center spacing={10}>
                <ColorButton size='small' flex={1} color='flare'>
                  flare
                </ColorButton>
                <ColorButton size='small' flex={1} color='orange_fun'>
                  orange_fun
                </ColorButton>
              </Stack>
              <Stack row center spacing={10}>
                <ColorButton size='small' flex={1} color='combi'>
                  combi
                </ColorButton>
                <ColorButton size='small' flex={1} color='shroom_haze'>
                  shroom_haze
                </ColorButton>
              </Stack>
              <Stack row center spacing={10}>
                <ColorButton size='small' flex={1} color='mystic'>
                  mystic
                </ColorButton>
                <ColorButton size='small' flex={1} color='serv_quick'>
                  serv_quick
                </ColorButton>
              </Stack>
              <Stack row center spacing={10}>
                <ColorButton size='small' flex={1} color='grey'>
                  grey
                </ColorButton>
              </Stack>
            </Stack>
          </PanelItem>
        </Panel>
      </Stack>
    </ContainerScrollView>
  );
};

export default Home;
