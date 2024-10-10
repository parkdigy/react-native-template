import React from 'react';
import {useAutoUpdateRefState} from '@pdg/react-hook';
import {Text_Default, Text_Primary} from '@style';
import {AgreementPanelItemCommand, AgreementPanelItemProps as Props} from './AgreementPanelItem.types';

export const AgreementPanelItem = React.forwardRef<AgreementPanelItemCommand, Props>(
  ({name, title, checked: initChecked, required, disabled, onChange, onDetailPress}, ref) => {
    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [checkedRef, checked, setChecked] = useAutoUpdateRefState(!!initChecked);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useEffect(() => {
      onChange?.(checked);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    useEffect(() => {
      if (ref) {
        const command: AgreementPanelItemCommand = {
          getName() {
            return name;
          },
          getChecked() {
            return checkedRef.current;
          },
          setChecked,
        };

        if (typeof ref === 'function') {
          ref(command);
        } else {
          ref.current = command;
        }
      }
      return () => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(null);
          } else {
            ref.current = null;
          }
        }
      };
    }, [checkedRef, name, ref, setChecked]);

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <Stack row center spacing={10}>
        <View flex={1}>
          <FormCheckbox name={name} checked={checked} disabled={disabled} onChange={setChecked}>
            <Text_Default>
              {required && <Text_Primary>[필수]&nbsp;</Text_Primary>}
              <Text_Default>{title}</Text_Default>
            </Text_Default>
          </FormCheckbox>
        </View>
        <View mt={-10} mb={-10}>
          <DetailButton disabled={disabled} onPress={onDetailPress} />
        </View>
      </Stack>
    );
  },
);

export default AgreementPanelItem;
