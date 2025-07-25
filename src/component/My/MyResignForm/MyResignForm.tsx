/********************************************************************************************************************
 * '더보기 > 앱 설정 > 회원탈퇴' 화면 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {useAppState} from '@context';
import {MyResignFormProps as Props} from './MyResignForm.types';
import {ConfirmDialog} from './controls';

/** 탈퇴 사유 */
const _reasons = [
  '',
  '앱의 제공하는 서비스나 기능에 대해 만족하지 못했습니다.',
  '개인정보 처리 방침이나 보안 문제에 대해 불안하게 느꼈습니다.',
];

const MyResignForm = ({navigation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
  const {auth} = useAppState();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [isNoticeAgree, setIsNoticeAgree] = useState(false);
  const [isReason1Agree, setIsReason1Agree] = useState(false);
  const [isReason2Agree, setIsReason2Agree] = useState(false);
  const [isReasonEtcAgree, setIsReasonEtcAgree] = useState(false);
  const [reasonEtc, setReasonEtc] = useState<string>();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [finalReasons, setFinalReasons] = useState<string[]>();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const canSubmit = useMemo(
    () => isNoticeAgree && (isReason1Agree || isReason2Agree || (isReasonEtcAgree && reasonEtc)),
    [isNoticeAgree, isReason1Agree, isReason2Agree, isReasonEtcAgree, reasonEtc],
  );

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleSubmit = useCallback(() => {
    const reasons: string[] = [];
    if (isReason1Agree) {
      reasons.push(_reasons[1]);
    }
    if (isReason2Agree) {
      reasons.push(_reasons[2]);
    }
    if (isReasonEtcAgree && reasonEtc) {
      reasons.push(reasonEtc);
    }

    setFinalReasons(reasons);
    setShowConfirmDialog(true);
  }, [isReason1Agree, isReason2Agree, isReasonEtcAgree, reasonEtc]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <>
      <KeyboardAwareContainerScrollView>
        <Stack spacing={28}>
          <Stack spacing={24}>
            <View>
              <TAccent s={18} bold lh={27}>
                <TPrimary s={18} bold lh={27}>
                  {auth?.nickname}
                </TPrimary>
                님,
              </TAccent>
              <TAccent s={18} bold lh={27}>
                회원 탈퇴 전 아래 내용을 확인해 주세요.
              </TAccent>
            </View>
            <View backgroundColor={theme.colors.opacity05} borderRadius={10}>
              <BulletValueList
                p={20}
                spacing={10}
                bulletProps={{style: {marginTop: 6}}}
                valueTextProps={{lineHeight: 18}}
                items={[
                  '회원 탈퇴 시 저장된 모든 데이터는 파기됩니다.',
                  '회원님의 정보는 탈퇴 시 즉시 파기되어 복구가 불가합니다.',
                ]}
              />
              <View height={1} backgroundColor={theme.colors.background} />
              <View p={8}>
                <FormCheckbox name='is_notice_agree' checked={isNoticeAgree} onChange={setIsNoticeAgree}>
                  <Stack row>
                    <TAccent>회원 탈퇴 유의사항을 확인하였습니다.</TAccent>
                  </Stack>
                </FormCheckbox>
              </View>
            </View>
          </Stack>

          <Divider />

          <Stack spacing={14}>
            <TAccent s={18} bold lh={27}>
              회원 탈퇴 사유를 선택해 주세요.
            </TAccent>
            <View>
              <FormCheckbox name='is_reason_1_agree' checked={isReason1Agree} onChange={setIsReason1Agree}>
                <Stack row flex={1}>
                  <T lh={18}>{_reasons[1]}</T>
                </Stack>
              </FormCheckbox>
              <FormCheckbox name='is_reason_2_agree' checked={isReason2Agree} onChange={setIsReason2Agree}>
                <Stack row flex={1}>
                  <T lh={18}>{_reasons[2]}</T>
                </Stack>
              </FormCheckbox>
              <Stack>
                <FormCheckbox name='is_reason_etc_agree' checked={isReasonEtcAgree} onChange={setIsReasonEtcAgree}>
                  <Stack row flex={1}>
                    <T lh={18}>기타 이유로 앱 사용에 불편함이 있었습니다.</T>
                  </Stack>
                </FormCheckbox>
                {isReasonEtcAgree && (
                  <FormText
                    name='reason_etc'
                    multiline
                    height={100}
                    ml={34}
                    mt={5}
                    placeholder='직접 입력'
                    value={reasonEtc}
                    onChange={setReasonEtc}
                  />
                )}
              </Stack>
            </View>
          </Stack>

          <Button size='xl' color='error' bold disabled={!canSubmit} onPress={handleSubmit}>
            회원 탈퇴
          </Button>
        </Stack>
      </KeyboardAwareContainerScrollView>

      {finalReasons && (
        <ConfirmDialog
          visible={showConfirmDialog}
          reasons={finalReasons}
          onSuccess={() => {
            navigation.popTo('MoreHome');
            nextTick(() => {
              navigation.navigate('Home');
            });
          }}
          onRequestClose={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  );
};

export default MyResignForm;
