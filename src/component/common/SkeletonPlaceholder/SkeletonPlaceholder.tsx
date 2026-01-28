import {type SkeletonPlaceholderProps as Props} from './SkeletonPlaceholder.types';

const SkeletonPlaceholder = ({children, backgroundColor, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <View>
      <View backgroundColor={ifUndefined(backgroundColor, theme.colors.opacity25)} borderRadius={10} {...props}>
        {children}
      </View>
    </View>
  );
};

export default SkeletonPlaceholder;
