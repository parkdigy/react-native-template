import {useWindowDimensions} from 'react-native';
import {type FullScreenDialogProps} from '../FullScreenDialog';
import {
  type DialogAlertProps,
  type DialogInnerCommands,
  type DialogConfirmProps,
  type DialogProps,
  type DialogCommands,
  type DialogOnlyProps,
} from './Dialog.types';
import {
  __addRef,
  __open,
  __openAlert,
  __openConfirm,
  __openErrorAlert,
  __openLoading,
  __openSuccessAlert,
  __removeRef,
  __setIsHiding,
} from './Dialog.function';

let dialogId = 0;

interface DialogInnerProps extends DialogProps {
  type: 'dialog' | 'alert' | 'confirm' | 'loading';
  id: number;
  hide?: boolean;
  loading?: boolean;
}

const Dialog = () => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();
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

  const commandOpen = useCallback(
    (props: DialogOnlyProps) => {
      dialogId += 1;
      setDialogs((old) => [...old, {...props, type: 'dialog', id: dialogId, hide: false}]);
      return makeReturnCommands(dialogId);
    },
    [makeReturnCommands],
  );

  const commandOpenLoading = useCallback(() => {
    dialogId += 1;
    setDialogs((old) => [
      ...old,
      {
        type: 'loading',
        id: dialogId,
        hide: false,
        position: 'center',
        transparent: true,
        content: (
          <View animation='bounceIn' p={40} backgroundColor={'#000000aa'} borderRadius={20}>
            <ActivityIndicator color='#ffffffcc' />
          </View>
        ),
      },
    ]);
    return makeReturnCommands(dialogId);
  }, [makeReturnCommands]);

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
      setDialogs((old) => [...old, {...props, type: 'confirm', id: dialogId, hide: false, icon: 'question'}]);
      return makeReturnCommands(dialogId);
    },
    [makeReturnCommands],
  );

  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const ref = useRef<DialogInnerCommands>({
    open: commandOpen,
    openLoading: commandOpenLoading,
    openAlert: commandOpenAlert,
    openConfirm: commandOpenConfirm,
  });

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    __addRef(ref);
    return () => {
      __removeRef(ref);
      __setIsHiding(false);
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
            iconColor = props.color || theme.colors.onSurface;
            textColor = props.color || theme.colors.textAccent;
            buttonColor = 'primary';
            break;
        }

        let buttons: FullScreenDialogProps['buttons'] = [];
        if (props.type === 'confirm') {
          buttons.push({
            label: props.cancelLabel || '취소',
            color: ifUndefined(props.cancelButtonColor, 'secondary'),
            ...props.cancelButtonProps,
            onPress() {
              handleCancelPress(props);
              if (props.type) {
                props.__hide = true;
                __setIsHiding(true);
                setDialogs((old) => [...old]);
              } else {
                hideComplete(props);
              }
            },
          });
        }

        if (props.type !== 'dialog') {
          buttons.push({
            label: props.confirmLabel || '확인',
            color: ifUndefined(props.confirmButtonColor, buttonColor),
            ...props.confirmButtonProps,
            onPress() {
              handleConfirmPress(props);
              if (props.type) {
                props.__hide = true;
                __setIsHiding(true);
                setDialogs((old) => [...old]);
              } else {
                hideComplete(props);
              }
            },
          });
        }

        if (props.reverseButtons) {
          buttons = buttons.reverse();
        }

        const icon =
          props.icon === 'check' ? (
            <Icon name='checkmark-circle' size={px.s45} color={props.iconColor || iconColor} />
          ) : props.icon === 'info' ? (
            <Icon name='information-circle' size={px.s45} color={props.iconColor || iconColor} />
          ) : props.icon === 'question' ? (
            <Icon name='help-circle' size={px.s45} color={props.iconColor || iconColor} />
          ) : (
            props.icon
          );

        const contentTitle = props.contentTitle ? (
          <>
            {['string', 'number'].includes(typeof props.contentTitle) ? (
              <T bold center s={15} lh={22} color={props.contentTitleColor || props.contentColor || textColor}>
                {props.contentTitle}
              </T>
            ) : (
              props.contentTitle
            )}
          </>
        ) : null;

        const content = ['string', 'number'].includes(typeof props.content) ? (
          <T center s={15} lh={22} color={props.contentColor || textColor}>
            {props.content}
          </T>
        ) : (
          props.content
        );

        const subContent = props.subContent ? (
          <Pressable
            onLongPress={
              props.subHiddenContent ? () => Dialog.openAlert({content: props.subHiddenContent}) : undefined
            }>
            {['string', 'number'].includes(typeof props.subContent) ? (
              <T
                s={12}
                lh={21}
                center
                borderWidth={1}
                borderRadius={10}
                borderColor={textColor}
                ph={10}
                pv={5}
                opacity={0.7}
                color={props.subContentColor || textColor}
                numberOfLines={5}
                mt={10}>
                {props.subContent}
              </T>
            ) : (
              props.subContent
            )}
          </Pressable>
        ) : null;

        const animationDuration = props.__hide ? 200 : 350;
        let contentAnimation: FullScreenDialogProps['contentAnimation'] | undefined;

        if (props.type) {
          if (props.__hide) {
            contentAnimation = {
              animation:
                props.position === 'top' ? 'slideOutUp' : props.position === 'center' ? 'bounceOut' : 'slideOutDown',
              duration: animationDuration,
              easing: 'ease-in',
            };
          } else {
            contentAnimation = {
              animation:
                props.position === 'top' ? 'slideInDown' : props.position === 'center' ? 'bounceIn' : 'slideInUp',
              duration: animationDuration,
              easing: 'ease-out-back',
            };
          }
        }
        return (
          <FullScreenDialog
            key={index}
            preventBackClose={props.preventBackClose}
            animation={props.type ? (props.__hide ? 'fadeOut' : 'fadeIn') : undefined}
            duration={animationDuration}
            backgroundColor={props.transparent ? 'transparent' : undefined}
            onAnimationEnd={
              props.type && props.__hide
                ? () => {
                    hideComplete(props);
                  }
                : undefined
            }
            contentAnimation={contentAnimation}
            type={props.type}
            visible={true}
            maxWidth={Math.min(
              props.maxWidth || windowWidth - (props.type === undefined ? 48 : 24),
              windowWidth - (props.type === undefined ? 48 : 24),
            )}
            minWidth={
              props.minWidth === undefined
                ? Math.min(280, windowWidth - 48)
                : Math.min(props.minWidth, windowWidth - 48)
            }
            fullWidth={props.type !== undefined}
            hideCloseButton
            buttons={props.type !== 'loading' ? buttons : undefined}
            position={props.position}
            horizontalButtons
            bottomView={props.bottomView}
            onRequestClose={() => {
              props.__hide = true;
              __setIsHiding(true);
              setDialogs((old) => [...old]);
              // handleConfirmPress(props);
              // hideComplete(props);
            }}>
            {props.type === undefined ? (
              <Stack
                ph={ifUndefined(props.ph, px.s40)}
                pv={ifUndefined(props.pv, px.s40)}
                spacing={ifUndefined(props.spacing, px.s14)}
                alignItems='center'>
                {icon}
                {contentTitle}
                {content}
                {subContent}
              </Stack>
            ) : props.type === 'loading' ? (
              <Stack
                ph={ifUndefined(props.ph, px.s40)}
                pv={ifUndefined(props.pv, px.s40)}
                spacing={ifUndefined(props.spacing, px.s14)}
                alignItems='center'>
                {content}
              </Stack>
            ) : (
              <Stack
                ph={ifUndefined(props.ph, px.s18)}
                pv={ifUndefined(props.pv, px.s30)}
                spacing={ifUndefined(props.spacing, px.s20)}
                alignItems='center'>
                {icon}
                <Stack spacing={px.s5} fullWidth>
                  {contentTitle}
                  {content}
                  {subContent}
                </Stack>
              </Stack>
            )}
          </FullScreenDialog>
        );
      })}
    </>
  );
};

Dialog.open = __open;
Dialog.openLoading = __openLoading;
Dialog.openAlert = __openAlert;
Dialog.openSuccessAlert = __openSuccessAlert;
Dialog.openErrorAlert = __openErrorAlert;
Dialog.openConfirm = __openConfirm;

export default Dialog;
