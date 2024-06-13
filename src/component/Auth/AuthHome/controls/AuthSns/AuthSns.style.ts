import styled from 'styled-components/native';
import {IconButton} from 'react-native-paper';

export const AuthSnsIconButton = styled(IconButton)`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

export const AuthSnsActivityIndicatorContainer = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;
