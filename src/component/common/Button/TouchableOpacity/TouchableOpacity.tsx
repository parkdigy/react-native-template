import {TouchableOpacity as NativeTouchableOpacity} from 'react-native';
import CustomComponent from '../../CustomComponent';
import {type TouchableOpacityProps as Props} from './TouchableOpacity.types';

const TouchableOpacity = ({activeOpacity, ...props}: Props) => {
  return (
    <CustomComponent component={NativeTouchableOpacity} activeOpacity={ifUndefined(activeOpacity, 0.8)} {...props} />
  );
};

export default TouchableOpacity;
