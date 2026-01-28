import {type CloseIconButtonProps as Props} from './CloseIconButton.types';

export const CloseIconButton = ({size = px.s30, iconColor, opacity, backgroundColor, onPress, ...props}: Props) => {
  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <TouchableOpacity
      style={[styles.closeButton, {backgroundColor, width: size + 14, height: size + 14}]}
      opacity={opacity}
      onPress={onPress}
      {...props}>
      <T color={iconColor} style={styles.closeText}>
        ✕
      </T>
    </TouchableOpacity>
  );
};

export default CloseIconButton;

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  closeButton: {
    marginRight: 8,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  closeText: {
    lineHeight: 24,
    fontSize: 20,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
