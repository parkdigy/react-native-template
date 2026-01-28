import {type ContainerScrollViewProps as Props} from './ContainerScrollView.types';

const ContainerScrollView = ({
  children,
  overflow,
  keyboardDismissMode,
  keyboardShouldPersistTaps,
  backgroundColor,
  style,
  ...props
}: Props) => {
  return (
    <ScrollView
      keyboardDismissMode={ifNullOrUndefined(keyboardDismissMode, 'interactive')}
      keyboardShouldPersistTaps={ifNullOrUndefined(keyboardShouldPersistTaps, 'handled')}
      style={[{flex: 1, overflow: overflow || 'visible', backgroundColor}, style]}
      {...props}>
      <View style={{paddingHorizontal: 15, paddingVertical: 15}}>{children}</View>
    </ScrollView>
  );
};

export default ContainerScrollView;
