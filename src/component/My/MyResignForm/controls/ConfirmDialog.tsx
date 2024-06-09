/********************************************************************************************************************
 * 회원 탈퇴 확인 다이얼로그 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {ModalProps} from 'react-native';
import Config from 'react-native-config';
import {Text_Accent, Text_Error_W600} from '@style';
import {useAppState} from '@context';
import storage from '@storage';

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
          await storage.remove(storage.Key.Fcm);
          Dialog.openSuccessAlert({
            contentTitle: '회원 탈퇴가 완료되었습니다.',
            content: `${Config.APP_TITLE} 서비스를 이용해 주셔서\n감사합니다.`,
            onConfirm() {
              clearAuth();
              onSuccess && onSuccess();
            },
          });
        })
        .catch((err) => {
          ll(err);
          const errMsg = app.getAxiosApiErrorResultMessage(err);

          switch (app.getAxiosApiErrorResultCode(err)) {
            case Const.Error.my.resign.alreadyResign:
              Dialog.openErrorAlert({
                content: app.getAxiosApiErrorResultMessage(err) as string,
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
          <Text_Accent>
            회원 탈퇴 후 <Text_Error_W600>복구가 불가능합니다.</Text_Error_W600>
          </Text_Accent>
          <Text_Accent>정말 탈퇴 하시겠습니까?</Text_Accent>
        </Stack>
      </Stack>
    </FullScreenDialog>
  ) : null;
};

export default ConfirmDialog;
