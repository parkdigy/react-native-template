import React from 'react';
import {Text_Default} from '@style';
import AgreementPanelItem, {AgreementPanelItemCommand, AgreementPanelItemProps} from '../AgreementPanelItem';
import {AgreementPanelProps as Props} from './AgreementPanel.types';

export const AgreementPanel = ({children, title, allCheck, allCheckName, disabled, itemPadding}: Props) => {
  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const itemsCommandRef = useRef<Dict<AgreementPanelItemCommand | null>>({});

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [allChecked, setAllChecked] = useState(false);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const itemCheckedChanged = useCallback(() => {
    const newAllChecked = !Object.values(itemsCommandRef.current).find((item) => {
      if (item) {
        return !item.getChecked();
      }
    });
    setAllChecked(newAllChecked);
  }, []);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleAllCheckChange = useCallback((checked: boolean) => {
    Keyboard.dismiss();
    Object.values(itemsCommandRef.current).forEach((item) => {
      item && item.setChecked(checked);
    });
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Panel title={title} itemPadding={itemPadding}>
      {/* 전체 체크 */}
      {allCheck && (
        <PanelItem>
          <FormCheckbox
            name={ifUndefined(allCheckName, '__AgreementPanelAllCheck__')}
            disabled={disabled}
            checked={allChecked}
            onChange={handleAllCheckChange}>
            <Text_Default>전체 동의</Text_Default>
          </FormCheckbox>
        </PanelItem>
      )}

      {React.Children.map(util.react.removeFragment(children), (child, idx) => {
        if (React.isValidElement(child)) {
          if (child.type !== AgreementPanelItem) {
            throw new Error('AgreementPanel 에는 AgreementPanelItem 만 포함될 수 있습니다.');
          }

          const itemRef = (child as React.RefAttributes<AgreementPanelItemCommand>).ref as
            | React.ForwardedRef<AgreementPanelItemCommand>
            | undefined;

          const {onChange: itemOnChange, ...itemProps} = child.props as AgreementPanelItemProps;
          return (
            <PanelItem key={idx}>
              <AgreementPanelItem
                ref={(instance) => {
                  if (itemRef) {
                    if (typeof itemRef === 'function') {
                      itemRef(instance);
                    } else {
                      itemRef.current = instance;
                    }
                  }
                  itemsCommandRef.current[itemProps.name] = instance;
                }}
                disabled={disabled}
                onChange={(checked) => {
                  itemOnChange && itemOnChange(checked);
                  itemCheckedChanged();
                }}
                {...itemProps}
              />
            </PanelItem>
          );
        }
      })}
    </Panel>
  );
};

export default AgreementPanel;
