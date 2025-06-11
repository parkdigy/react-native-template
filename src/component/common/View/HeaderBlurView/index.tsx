import HeaderBlurView from './HeaderBlurView';
import {HeaderBlurViewProps} from './HeaderBlurView.types';

export default HeaderBlurView;

export {HeaderBlurView};

export * from './HeaderBlurView.types';

/********************************************************************************************************************
 * renderHeaderBlurView
 * ******************************************************************************************************************/

export const renderHeaderBlurView = (animation?: HeaderBlurViewProps['animation'], content?: ReactNode) => () =>
  <HeaderBlurView animation={animation}>{content}</HeaderBlurView>;
