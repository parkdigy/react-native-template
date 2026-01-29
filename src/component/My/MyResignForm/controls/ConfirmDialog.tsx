/********************************************************************************************************************
 * 회원 탈퇴 확인 다이얼로그 컴포넌트
 * ******************************************************************************************************************/

import {type ModalProps} from 'react-native';
import Config from 'react-native-config';
import {useAppState} from '@context';

interface Props extends Pick<ModalProps, 'visible'> {
  reasons: string[];
  onSuccess?(): void;
  onRequestClose?(): void;
}
const ConfirmDialog = ({reasons, visible, onSuccess, onRequestClose}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {auth, clearAuth} = useAppState();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [submitting, setSubmitting] = useState(false);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const resign = useCallback(() => {
    setSubmitting(true);

    delayTimeout(() => {
      Const.My.resign({reasons})
        .then(async () => {
          storage.user.remove(storage.user.Key.Fcm);
          Dialog.openSuccessAlert({
            contentTitle: '회원 탈퇴가 완료되었습니다.',
            content: `${Config.APP_TITLE} 서비스를 이용해 주셔서\n감사합니다.`,
            onConfirm() {
              clearAuth();
              onSuccess?.();
            },
          });
        })
        .catch((err) => {
          le(err);
          const errMsg = api.error.getResultMessage(err);

          switch (api.error.getResultCode(err)) {
            case Const.Error.my.resign.alreadyResign:
              Dialog.openErrorAlert({
                content: api.error.getResultMessage(err) as string,
              });
              break;
            default:
              Dialog.openErrorAlert({
                contentTitle: '회원 탈퇴 실패',
                content: '회원 탈퇴 중 오류가 발생했습니다.\n잠시 후 재시도 해주세요.',
                subContent: errMsg,
              });
              break;
          }
        })
        .finally(() => setSubmitting(false));
    });
  }, [clearAuth, onSuccess, reasons]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return auth ? (
    <FullScreenDialog
      visible={visible}
      fullWidth
      backdropClose
      onRequestClose={onRequestClose}
      disabledCloseButton={submitting}
      buttons={[{label: '회원 탈퇴 완료', color: 'error', loading: submitting, onPress: resign}]}
      title='회원 탈퇴'
      titleColor={theme.colors.onError}
      titleBackgroundColor={theme.colors.error}>
      <Stack ph={24} pv={24} spacing={16}>
        <Stack>
          <TAccent>
            회원 탈퇴 후 <TError bold>복구가 불가능합니다.</TError>
          </TAccent>
          <TAccent>정말 탈퇴 하시겠습니까?</TAccent>
        </Stack>
      </Stack>
    </FullScreenDialog>
  ) : null;
};

export default ConfirmDialog;
