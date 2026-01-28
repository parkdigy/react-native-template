import {SegmentedButtons, type SegmentedButtonsProps} from 'react-native-paper';
import {type FormSegmentProps as Props} from './FormSegment.types';

const FormSegment = ({
  outlineWidth,
  outlineColor,
  theme: initTheme,
  disabled,
  buttons: initButtons,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const buttons: SegmentedButtonsProps['buttons'] = useMemo(
    () =>
      initButtons.map((button) => {
        const active = props.value === button.value;
        const finalDisabled = ifUndefined(button.disabled, disabled);
        return {
          ...button,
          disabled: finalDisabled,
          labelStyle: [
            {
              fontSize: 12,
              fontWeight: active ? '700' : '500',
              color: active ? theme.colors.bgPrimary : theme.colors.onPrimary400,
            },
            button.labelStyle,
          ],
          style: [
            {
              flex: 1,
              minWidth: 0,
              backgroundColor: active ? theme.colors.green300 : theme.colors.primary400,
              borderWidth: ifUndefined(outlineWidth, 0),
              opacity: finalDisabled ? 0.5 : undefined,
            },
            button.style,
          ],
        };
      }),
    [
      initButtons,
      props.value,
      disabled,
      theme.colors.bgPrimary,
      theme.colors.onPrimary400,
      theme.colors.green300,
      theme.colors.primary400,
      outlineWidth,
    ],
  );

  const finalTheme = useMemo(
    () => ({
      ...initTheme,
      colors: {
        outline: initTheme?.colors?.outline || outlineColor || theme.colors.background,
        ...initTheme?.colors,
      },
      roundness: 2,
    }),
    [initTheme, outlineColor, theme.colors.background],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <SegmentedButtons theme={finalTheme} buttons={buttons} {...props} />;
};

export default FormSegment;
