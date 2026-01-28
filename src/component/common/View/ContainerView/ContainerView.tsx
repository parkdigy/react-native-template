import {type ContainerViewProps as Props} from './ContainerView.types';

const ContainerView = ({flex, ph, pv, ...props}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalFlex = useMemo(() => ifUndefined(flex, 1), [flex]);
  const finalPh = useMemo(() => ifUndefined(ph, 15), [ph]);
  const finalPv = useMemo(() => ifUndefined(pv, 15), [pv]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <View flex={finalFlex} ph={finalPh} pv={finalPv} {...props} />;
};

export default ContainerView;
