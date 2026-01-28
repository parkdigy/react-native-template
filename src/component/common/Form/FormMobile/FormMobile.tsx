import {type FormTelCommands} from '../FormTel';
import {type FormMobileProps as Props, type FormMobileCommands} from './FormMobile.types';

const VALID_PATTERN =
  /(^(01(?:0|1|[6-9]))([0-9]{3,4})([0-9]{4,4})$)|(^(01(?:0|1|[6-9]))-([0-9]{3,4})-([0-9]{4,4})$)|(^\+(?:[-]?[0-9]){8,}$)/;

const FormMobile = ({ref, $controlType, validPattern, $onGetCommands, ...props}: Props) => {
  const handleGetCommands = useCallback(
    (baseCommands: FormTelCommands) => {
      let finalCommands: FormMobileCommands = {
        ...baseCommands,
      };

      if ($onGetCommands) {
        finalCommands = $onGetCommands(finalCommands);
      }

      if (ref) {
        if (typeof ref === 'function') {
          ref(finalCommands);
        } else {
          ref.current = finalCommands;
        }
      }

      return finalCommands;
    },
    [$onGetCommands, ref],
  );

  return (
    <FormTel
      $controlType={ifUndefined($controlType, 'mobile')}
      $onGetCommands={handleGetCommands}
      validPattern={ifUndefined(validPattern, VALID_PATTERN)}
      {...props}
    />
  );
};

export default FormMobile;
