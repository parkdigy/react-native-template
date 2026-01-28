import {Text_Default, Text_Primary} from '../../Text';
import {type AgreementPanelItemCommand, type AgreementPanelItemProps as Props} from './AgreementPanelItem.types';

export const AgreementPanelItem = ({
  ref,
  name,
  title,
  checked: initChecked,
  required,
  disabled,
  onChange,
  onDetailPress,
}: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [checked, _setChecked] = useState(!!initChecked);
  const checkedRef = useRef(checked);
  const setChecked = useCallback((newChecked: boolean) => {
    _setChecked(newChecked);
    checkedRef.current = newChecked;
  }, []);
  useFirstSkipChanged(() => setChecked(!!initChecked), [initChecked]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEventEffect(() => {
    onChange?.(checked);
  }, [checked]);

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  useForwardRef(
    ref,
    useMemo<AgreementPanelItemCommand>(
      () => ({
        getName() {
          return name;
        },
        getChecked() {
          return checkedRef.current;
        },
        setChecked,
      }),
      [checkedRef, name, setChecked],
    ),
  );

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
};

export default AgreementPanelItem;
