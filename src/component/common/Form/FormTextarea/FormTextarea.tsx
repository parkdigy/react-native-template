import {type FormTextCommands} from '../FormText';
import {type FormTextareaProps as Props, type FormTextareaCommands} from './FormTextarea.types';

const FormTextarea = ({ref, height, $controlType, $onGetCommands, ...props}: Props) => {
  const handleGetCommands = useCallback(
    (baseCommands: FormTextCommands) => {
      let finalCommands: FormTextareaCommands = {
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
    <FormText
      type='text'
      $controlType={ifUndefined($controlType, 'textarea')}
      multiline
      height={ifUndefined(height, 100)}
      $onGetCommands={handleGetCommands}
      {...props}
    />
  );
};

export default FormTextarea;
