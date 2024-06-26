import React from 'react';
import {useWindowDimensions} from 'react-native';
import {FullScreenDialogProps} from '@ccomp';
import {Text_W500, Text_W700} from '@style';
import {DialogAlertProps, DialogInnerCommands, DialogConfirmProps, DialogProps, DialogCommands} from './Dialog.types';

let dialogId = 0;

interface DialogInnerProps extends DialogProps {
  type: 'alert' | 'confirm';
  id: number;
  hide?: boolean;
  loading?: boolean;
}

const Dialog = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {width: windowWidth} = useWindowDimensions();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [dialogs, setDialogs] = useState<DialogInnerProps[]>([]);

  /********************************************************************************************************************
   * Commands
   * ******************************************************************************************************************/

  const commandClose = useCallback((id: number, hideComplete = false): void => {
    setDialogs((old) => {
      const foundProps = old.find((p) => p.id === id);
      if (foundProps) {
        if (!foundProps.hide) {
          foundProps.hide = true;
        }
        if (hideComplete) {
          return old.filter((p) => p.id !== id);
        } else {
          return [...old];
        }
      }
      return old;
    });
  }, []);

  const commandSetLoading = useCallback((id: number, loading: boolean) => {
    setDialogs((old) => {
      const foundProps = old.find((p) => p.id === id);
      if (foundProps) {
        if (!foundProps.hide && foundProps.loading !== loading) {
          foundProps.loading = loading;
          return [...old];
        }
      }
      return old;
    });
  }, []);

  const makeReturnCommands = useCallback(
    (id: number): DialogCommands => {
      return {
        close() {
          commandClose(id, true);
        },
        setLoading(loading: boolean) {
          commandSetLoading(id, loading);
        },
      };
    },
    [commandClose, commandSetLoading],
  );

  const commandOpenAlert = useCallback(
    (props: DialogAlertProps) => {
      dialogId += 1;
      setDialogs((old) => [...old, {...props, type: 'alert', id: dialogId, hide: false}]);
      return makeReturnCommands(dialogId);
    },
    [makeReturnCommands],
  );

  const commandOpenConfirm = useCallback(
    (props: DialogConfirmProps) => {
      dialogId += 1;
      setDialogs((old) => [...old, {...props, type: 'confirm', id: dialogId, hide: false}]);
      return makeReturnCommands(dialogId);
    },
    [makeReturnCommands],
  );

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const ref = useRef<DialogInnerCommands>({
    openAlert: commandOpenAlert,
    openConfirm: commandOpenConfirm,
  });

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    addRef(ref);
    return () => {
      removeRef(ref);
    };
  }, []);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  const hideComplete = useCallback((props: DialogInnerProps) => {
    setDialogs((old) => old.filter((p) => p !== props));
  }, []);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  const handleCancelPress = useCallback(
    (props: DialogInnerProps) => {
      const autoHide = ifUndefined(props.autoHide, true);
      props.onCancel && props.onCancel();
      if (autoHide) {
        commandClose(props.id);
      }
    },
    [commandClose],
  );

  const handleConfirmPress = useCallback(
    (props: DialogInnerProps) => {
      const autoHide = ifUndefined(props.autoHide, true);
      props.onConfirm && props.onConfirm();
      if (autoHide) {
        commandClose(props.id);
      }
    },
    [commandClose],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return dialogs.length === 0 ? null : (
    <>
      {dialogs.map((props, index) => {
        let iconColor: string;
        let textColor: string;
        let buttonColor: ButtonProps['color'];

        switch (props.color) {
          case 'primary':
            iconColor = theme.colors.primary;
            textColor = theme.colors.primary;
            buttonColor = props.color;
            break;
          case 'error':
            iconColor = theme.colors.error;
            textColor = theme.colors.error;
            buttonColor = props.color;
            break;
          case 'success':
            iconColor = theme.colors.success;
            textColor = theme.colors.success;
            buttonColor = props.color;
            break;
          default:
            iconColor = props.color || (props.icon === 'check' ? theme.colors.primary : theme.colors.primary200);
            textColor = props.color || theme.colors.textAccent;
            buttonColor = props.type === 'alert' ? 'primary200' : 'primary';
            break;
        }

        const buttons: FullScreenDialogProps['buttons'] = [];
        if (props.type === 'confirm') {
          buttons.push({
            label: props.cancelLabel || '취소',
            color: ifUndefined(props.cancelButtonColor, 'white'),
            ...props.cancelButtonProps,
            onPress() {
              handleCancelPress(props);
              hideComplete(props);
            },
          });
        }

        buttons.push({
          label: props.confirmLabel || '확인',
          color: ifUndefined(props.confirmButtonColor, buttonColor),
          ...props.confirmButtonProps,
          onPress() {
            handleConfirmPress(props);
            hideComplete(props);
          },
        });

        return (
          <FullScreenDialog
            key={index}
            visible={true}
            maxWidth={Math.min(props.maxWidth || windowWidth - 48, windowWidth - 48)}
            minWidth={
              props.minWidth === undefined
                ? Math.min(280, windowWidth - 48)
                : Math.min(props.minWidth, windowWidth - 48)
            }
            hideCloseButton
            buttons={buttons}
            bottomView={props.bottomView}
            onRequestClose={() => {
              handleConfirmPress(props);
              hideComplete(props);
            }}>
            <Stack
              ph={ifUndefined(props.ph, 40)}
              pv={ifUndefined(props.pv, 40)}
              spacing={ifUndefined(props.spacing, 14)}
              alignItems='center'>
              {props.icon === 'check' && (
                <View alignItems='center' justifyContent='center'>
                  <View p={7} backgroundColor={theme.colors.primary400} borderRadius={30}>
                    <Icon name='check' size={25} color={theme.colors.primary} />
                  </View>
                </View>
              )}
              {props.icon === 'info' && <Icon name='information' size={45} color={props.iconColor || iconColor} />}
              {props.contentTitle && (
                <>
                  {['string', 'number'].includes(typeof props.contentTitle) ? (
                    <Text_W700
                      textAlign='center'
                      lineHeight={21}
                      color={props.contentTitleColor || props.contentColor || textColor}>
                      {props.contentTitle}
                    </Text_W700>
                  ) : (
                    props.contentTitle
                  )}
                </>
              )}
              {['string', 'number'].includes(typeof props.content) ? (
                <Text_W500 textAlign='center' lineHeight={21} color={props.contentColor || textColor}>
                  {props.content}
                </Text_W500>
              ) : (
                props.content
              )}
              {props.subContent && (
                <Pressable
                  onLongPress={
                    props.subHiddenContent ? () => Dialog.openAlert({content: props.subHiddenContent}) : undefined
                  }>
                  {['string', 'number'].includes(typeof props.subContent) ? (
                    <Text_W500
                      size='sm'
                      borderWidth={1}
                      borderRadius={10}
                      borderColor={textColor}
                      ph={10}
                      pv={5}
                      opacity={0.7}
                      textAlign='center'
                      lineHeight={21}
                      color={props.subContentColor || textColor}
                      numberOfLines={5}
                      mt={10}>
                      {props.subContent}
                    </Text_W500>
                  ) : (
                    props.subContent
                  )}
                </Pressable>
              )}
            </Stack>
          </FullScreenDialog>
        );
      })}
    </>
  );
};

let refs: React.RefObject<DialogInnerCommands>[] = [];

const addRef = (ref: React.RefObject<DialogInnerCommands>) => {
  refs.push(ref);
};

const removeRef = (ref: React.RefObject<DialogInnerCommands>) => {
  refs = refs.filter((r) => r !== ref);
};

Dialog.openAlert = (props: DialogAlertProps): DialogCommands => {
  if (refs.length > 0) {
    const lastInstance = refs[refs.length - 1].current;
    if (lastInstance) {
      return lastInstance.openAlert(props);
    }
  }
  throw Error('Dialog Instance Not Exists');
};

Dialog.openSuccessAlert = (
  props: Pick<DialogAlertProps, 'contentTitle' | 'content' | 'subContent' | 'subHiddenContent' | 'onConfirm'>,
): DialogCommands => {
  if (refs.length > 0) {
    const lastInstance = refs[refs.length - 1].current;
    if (lastInstance) {
      return lastInstance.openAlert({icon: 'check', ...props});
    }
  }
  throw Error('Dialog Instance Not Exists');
};

Dialog.openErrorAlert = (
  props: Pick<DialogAlertProps, 'contentTitle' | 'content' | 'subContent' | 'subHiddenContent' | 'onConfirm'>,
): DialogCommands => {
  if (refs.length > 0) {
    const lastInstance = refs[refs.length - 1].current;
    if (lastInstance) {
      return lastInstance.openAlert({icon: 'info', ...props});
    }
  }
  throw Error('Dialog Instance Not Exists');
};

Dialog.openConfirm = (props: DialogConfirmProps): DialogCommands => {
  if (refs.length > 0) {
    const lastInstance = refs[refs.length - 1].current;
    if (lastInstance) {
      return lastInstance.openConfirm(props);
    }
  }
  throw Error('Dialog Instance Not Exists');
};

export default Dialog;
