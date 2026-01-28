import {View} from 'react-native';
import {type KeyboardAwareContainerScrollViewProps as Props} from './KeyboardAwareContainerScrollView.types';

const KeyboardAwareContainerScrollView = ({children, extraHeight, ...props}: Props) => {
  return (
    <KeyboardAwareScrollView extraHeight={ifUndefined(extraHeight, 70)} {...props}>
      <View style={{paddingHorizontal: 15, paddingVertical: 15}}>{children}</View>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareContainerScrollView;
