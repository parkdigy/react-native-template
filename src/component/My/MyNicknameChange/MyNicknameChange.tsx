import React from 'react';
import {useAppState} from '@context';
import {FormCommands} from '@ccomp';
import {MyNicknameChangeProps as Props} from './MyNicknameChange.types';

export const MyNicknameChange = ({navigation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {auth, setAuth} = useAppState();

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const scrollViewRef = useRef<NativeScrollView>(null);
  const formRef = useRef<FormCommands>(null);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [submitting, setSubmitting] = useState(false);
  const [nickname, setNickname] = useState<string>();

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleFormSubmit = useCallback(
    (data: Dict) => {
      app.setLockScreen(true);
      setSubmitting(true);

      delayTimeout(() => {
        Const.My.editNickname(data.nickname)
          .then(() => {
            if (auth) {
              setAuth({...auth, nickname: data.nickname});
            }
            navigation.goBack();
            app.setLockScreen(false);
            setSubmitting(false);
          })
          .catch((err) => {
            switch (app.getAxiosApiErrorResultCode(err)) {
              default:
                Dialog.openErrorAlert({
                  contentTitle: '닉네임 변경 실패',
                  content: '닉네임 변경 중 오류가 발생했습니다. 잠시 후 재시도 해주세요.',
                  subContent: app.getAxiosApiErrorResultMessage(err),
                  subHiddenContent: app.getAxiosApiErrorResultError(err),
                });
                break;
            }

            app.setLockScreen(false);
            setSubmitting(false);
          });
      });
    },
    [auth, navigation, setAuth],
  );

  const handleNameValidate = useCallback(
    (newNickname: string | undefined) => {
      if (newNickname === auth?.nickname) {
        return '현재 닉네임과 다른 닉네임을 입력해주세요.';
      }
      return true;
    },
    [auth?.nickname],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return auth ? (
    <KeyboardAwareContainerScrollView ref={scrollViewRef}>
      <Form ref={formRef} parentScrollView={scrollViewRef} onSubmit={handleFormSubmit}>
        <Stack spacing={24} pb={8}>
          <Stack spacing={8}>
            <TRight100 lh={18}>현재 닉네임</TRight100>
            <TAccent bold lh={18}>
              {auth.nickname}
            </TAccent>
          </Stack>

          <Divider />

          <Stack spacing={24}>
            {/* 변경할 닉네임 */}
            <FormText
              name='nickname'
              label='변경할 닉네임'
              placeholder='변경할 닉네임'
              required
              autoFocus
              returnKeyType='go'
              blurOnSubmit={false}
              maxLength={30}
              disabled={submitting}
              value={nickname}
              onChange={setNickname}
              onValidate={handleNameValidate}
              onSubmitEditing={() => formRef.current?.submit()}
            />

            <Button
              size={'xl'}
              bold
              loading={submitting}
              disabled={ifUndefined(nickname, '') === ''}
              onPress={() => formRef.current?.submit()}>
              닉네임 변경 완료
            </Button>
          </Stack>
        </Stack>
      </Form>
    </KeyboardAwareContainerScrollView>
  ) : null;
};

export default MyNicknameChange;
