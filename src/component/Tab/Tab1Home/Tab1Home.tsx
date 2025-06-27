import React from 'react';
import {Tab1HomeProps as Props} from './Tab1Home.types';

export const Tab1Home = ({}: Props) => {
  return (
    <ContainerScrollView>
      <Panel>
        <PanelItem>
          <Stack spacing={5}>
            <T center s={16}>
              Text
            </T>
            <TAccent center s={16}>
              Accent
            </TAccent>
            <TExtraAccent center s={16}>
              ExtraAccent
            </TExtraAccent>
            <TPrimary center s={16}>
              Primary
            </TPrimary>
            <TPrimaryAccent center s={16}>
              PrimaryAccent
            </TPrimaryAccent>
            <TPrimary100 center s={16}>
              Primary100
            </TPrimary100>
            <TPrimary200 center s={16}>
              Primary200
            </TPrimary200>
            <TPrimary300 center s={16}>
              Primary300
            </TPrimary300>
            <TPrimary400 center s={16}>
              Primary400
            </TPrimary400>
            <TSuccess center s={16}>
              Success
            </TSuccess>
            <TError center s={16}>
              Error
            </TError>
            <TWarning center s={16}>
              Warning
            </TWarning>
            <TRight100 center s={16}>
              Right100
            </TRight100>
            <TRight200 center s={16}>
              Right200
            </TRight200>
            <TGray center s={16}>
              Gray
            </TGray>
            <TBlack center s={16}>
              Black
            </TBlack>
            <TWhite center s={16}>
              White
            </TWhite>
          </Stack>
        </PanelItem>
      </Panel>
    </ContainerScrollView>
  );
};

export default Tab1Home;
