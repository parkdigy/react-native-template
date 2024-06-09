import React from 'react';
import {ContainerViewProps as Props} from './ContainerView.types';

const ContainerView = React.forwardRef<NativeView, Props>(({flex, ph, pv, ...props}, ref) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalFlex = useMemo(() => ifUndefined(flex, 1), [flex]);
  const finalPh = useMemo(() => ifUndefined(ph, 24), [ph]);
  const finalPv = useMemo(() => ifUndefined(pv, 16), [pv]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <View ref={ref} flex={finalFlex} ph={finalPh} pv={finalPv} {...props} />;
});

export default ContainerView;
