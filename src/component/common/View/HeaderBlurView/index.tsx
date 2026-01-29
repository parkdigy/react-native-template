import HeaderBlurView from './HeaderBlurView';
import {type HeaderBlurViewProps} from './HeaderBlurView.types';

export default HeaderBlurView;

export {HeaderBlurView};

export * from './HeaderBlurView.types';

/********************************************************************************************************************
 * renderHeaderBlurView
 * ******************************************************************************************************************/

export const renderHeaderBlurView = (animation?: HeaderBlurViewProps['animation'], content?: ReactNode) => () => {
  return <HeaderBlurView animation={animation}>{content}</HeaderBlurView>;
};
