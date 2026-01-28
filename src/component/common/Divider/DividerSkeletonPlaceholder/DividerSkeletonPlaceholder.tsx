import {type DividerSkeletonPlaceholderProps as Props} from './DividerSkeletonPlaceholder.types';

const DividerSkeletonPlaceholder = ({}: Props) => {
  return (
    <SkeletonPlaceholder>
      <View height={1} />
    </SkeletonPlaceholder>
  );
};

export default DividerSkeletonPlaceholder;
