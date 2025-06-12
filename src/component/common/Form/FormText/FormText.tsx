import React from 'react';
import {NativeSyntheticEvent, TextInput as NativeTextInput, TextInputSubmitEditingEventData} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import {useFirstSkipEffect} from '@pdg/react-hook';
import {useAppState} from '@context';
import {_getFontFamily} from '@types';
import CustomComponent from '../../CustomComponent';
import FormControl, {FormControlCommands} from '../FormControl';
import {FormTextProps as Props, FormTextCommands, FormTextValue} from './FormText.types';
import {PaperBlueDarkTheme, PaperBlueLightTheme} from '@theme';

const FormText = React.forwardRef<FormTextCommands, Props>(
  (
    {
      children,
      $controlType,
      type = 'text',
      mode = 'outlined',
      name,
      value: initValue,
      label,
      labelStyle,
      labelHelperText,
      error: initError,
      hideErrorText,
      helperText,
      disabled,
      required,
      multiline = false,
      validPattern,
      invalidPattern,
      invalidPatternErrorText = '형식이 일치하지 않습니다.',
      size,
      paddingRight = 10,
      backgroundColor,
      style,
      color,
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      bold,
      letterSpacing,
      textAlign,
      textDecorationLine,
      textDecorationStyle,
      textDecorationColor,
      textShadowColor,
      textShadowOffset,
      textShadowRadius,
      textTransform,
      inputMode,
      keyboardType,
      secureTextEntry,
      textContentType,
      returnKeyType: initReturnKeyType,
      selectTextOnFocus = true,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      placeholderTextColor,
      clearButtonMode,
      height,
      left,
      right,
      nextName,
      forceTheme,
      errorHelperTextColor,
      blurOnSubmit: initBlurOnSubmit,
      outlineColor: initOutlineColor,
      outlineStyle: initOutlineStyle,
      activeOutlineColor: initActiveOutlineColor,
      onFocus,
      onEndEditing,
      onValidate,
      onChange,
      onChangeError,
      onValue,
      onSubmitEditing,
      $onGetCommands,
      ...props
    },
    ref,
  ) => {
    /********************************************************************************************************************
     * Use
     * ******************************************************************************************************************/

    const appTheme = useTheme();
    const formState = useFormState();
    const {fontFamily: appFontFamily} = useAppState();

    const theme = forceTheme === 'light' ? PaperBlueLightTheme : forceTheme === 'dark' ? PaperBlueDarkTheme : appTheme;

    /********************************************************************************************************************
     * Ref
     * ******************************************************************************************************************/

    const innerRef = useRef<NativeTextInput | null>(null);
    const innerValueRef = useRef<string | undefined>(initValue);
    const commandsRef = useRef<FormTextCommands>(null);
    const validateTimeoutRef = useRef<number>(undefined);

    /********************************************************************************************************************
     * Function
     * ******************************************************************************************************************/

    const getFinalValue = useCallback(
      (value: FormTextValue | undefined) => (onValue ? onValue(value) : value),
      [onValue],
    );

    /********************************************************************************************************************
     * State
     * ******************************************************************************************************************/

    const [value, setValue] = useState<Props['value']>(getFinalValue(initValue));
    const [error, setError] = useState(ifUndefined(initError, false));
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [showVisiblePassword, setShowVisiblePassword] = useState(false);
    const [showClear, setShowClear] = useState(false);
    const [focused, setFocused] = useState(false);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useEffect(() => {
      return () => {
        if (validateTimeoutRef.current) {
          clearTimeout(validateTimeoutRef.current);
          validateTimeoutRef.current = undefined;
        }
      };
    }, []);

    useEffect(() => {
      setValue(getFinalValue(initValue));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initValue]);

    useEffect(() => {
      innerValueRef.current = value;
      const notEmptyValue = notEmpty(value);
      setShowVisiblePassword(notEmptyValue);
      setShowClear(notEmptyValue);
    }, [value]);

    /********************************************************************************************************************
     * Effect
     * ******************************************************************************************************************/

    useFirstSkipEffect(() => {
      setError(ifUndefined(initError, false));
    }, [initError]);

    /********************************************************************************************************************
     * Variable
     * ******************************************************************************************************************/

    const finalFontSize = ifUndefined(ifUndefined(fontSize, size), 14);

    /********************************************************************************************************************
     * Memo
     * ******************************************************************************************************************/

    const useVisiblePassword = useMemo(() => type === 'password' || type === 'newPassword', [type]);
    const returnKeyType = useMemo(
      () => (initReturnKeyType !== undefined ? initReturnKeyType : nextName ? 'next' : undefined),
      [initReturnKeyType, nextName],
    );
    const blurOnSubmit = useMemo(
      () => (initBlurOnSubmit === undefined ? !multiline && (returnKeyType !== 'next' || !nextName) : initBlurOnSubmit),
      [initBlurOnSubmit, returnKeyType, nextName, multiline],
    );

    /********************************************************************************************************************
     * Memo - Style
     * ******************************************************************************************************************/

    const finalFontWeight = useMemo(() => (bold ? 'bold' : fontWeight), [bold, fontWeight]);

    const customStyle = useMemo(() => {
      const newCustomStyle: Record<string, any> = {};
      newCustomStyle.color = color || theme.colors.onSurface;
      ifUndefined(fontFamily, appFontFamily) !== undefined &&
        (newCustomStyle.fontFamily = ifUndefined(fontFamily, appFontFamily));
      fontStyle !== undefined && (newCustomStyle.fontStyle = fontStyle);
      letterSpacing !== undefined && (newCustomStyle.letterSpacing = letterSpacing);
      textDecorationLine !== undefined && (newCustomStyle.textDecorationLine = textDecorationLine);
      textDecorationStyle !== undefined && (newCustomStyle.textDecorationStyle = textDecorationStyle);
      textDecorationColor !== undefined && (newCustomStyle.textDecorationColor = textDecorationColor);
      textShadowColor !== undefined && (newCustomStyle.textShadowColor = textShadowColor);
      textShadowOffset !== undefined && (newCustomStyle.textShadowOffset = textShadowOffset);
      textShadowRadius !== undefined && (newCustomStyle.textShadowRadius = textShadowRadius);
      textTransform !== undefined && (newCustomStyle.textTransform = textTransform);

      newCustomStyle.textAlign = ifUndefined(textAlign, 'auto');
      newCustomStyle.fonSize = finalFontSize;
      if (newCustomStyle.fontFamily && finalFontWeight) {
        newCustomStyle.fontFamily = _getFontFamily(newCustomStyle.fontFamily, finalFontWeight);
      }

      return newCustomStyle;
    }, [
      color,
      theme.colors.onSurface,
      fontFamily,
      appFontFamily,
      fontStyle,
      letterSpacing,
      textDecorationLine,
      textDecorationStyle,
      textDecorationColor,
      textShadowColor,
      textShadowOffset,
      textShadowRadius,
      textTransform,
      textAlign,
      finalFontSize,
      finalFontWeight,
    ]);

    const otherStyle: Props['style'] = useMemo(() => {
      const newOtherStyle: Props['style'] = {overflow: 'hidden', padding: 0};
      if (height !== undefined) {
        newOtherStyle.height = height;
      }
      if (disabled) {
        newOtherStyle.opacity = 0.5;
      }
      return newOtherStyle;
    }, [height, disabled]);

    const finalStyle: Props['style'] = useMemo(
      () => [customStyle, otherStyle, style],
      [customStyle, otherStyle, style],
    );

    /********************************************************************************************************************
     * Memo - backgroundColor
     * ******************************************************************************************************************/

    const finalBackgroundColor = useMemo(() => {
      if (backgroundColor === undefined) {
        return mode === 'outlined' ? theme.colors.surface : undefined;
      } else {
        return backgroundColor;
      }
    }, [mode, backgroundColor, theme]);

    /********************************************************************************************************************
     * Memo - inputMode
     * ******************************************************************************************************************/

    const finalInputMode = useMemo((): Props['inputMode'] => {
      if (inputMode === undefined) {
        switch (type) {
          case 'search':
            return type;
          default:
            return undefined;
        }
      } else {
        return inputMode;
      }
    }, [type, inputMode]);

    /********************************************************************************************************************
     * Memo - keyboardType
     * ******************************************************************************************************************/

    const finalKeyboardType = useMemo((): Props['keyboardType'] => {
      if (keyboardType === undefined) {
        switch (type) {
          case 'email':
          case 'userEmail':
            return 'email-address';
          case 'numeric':
          case 'tel':
            return 'number-pad';
          case 'url':
            return 'url';
          case 'decimal':
            return 'decimal-pad';
          default:
            return 'default';
        }
      } else {
        return keyboardType;
      }
    }, [type, keyboardType]);

    /********************************************************************************************************************
     * Memo - secureTextEntry
     * ******************************************************************************************************************/

    const finalSecureTextEntry = useMemo(
      (): Props['secureTextEntry'] => ifUndefined(secureTextEntry, type === 'password' || type === 'newPassword'),
      [type, secureTextEntry],
    );

    /********************************************************************************************************************
     * Memo - textContentType
     * ******************************************************************************************************************/

    const finalTextContentType = useMemo((): Props['textContentType'] => {
      if (isIos) {
        if (textContentType === undefined) {
          switch (type) {
            case 'userEmail':
              return 'username';
            case 'url':
              return 'URL';
            case 'email':
              return 'emailAddress';
            case 'tel':
              return 'telephoneNumber';
            case 'newPassword':
              return 'oneTimeCode';
            case 'password':
            case 'name':
            case 'nickname':
            case 'oneTimeCode':
              return type;
          }
        } else {
          return textContentType;
        }
      } else {
        return undefined;
      }
    }, [textContentType, type]);

    /********************************************************************************************************************
     * Memo - autoCapitalize
     * ******************************************************************************************************************/

    const finalAutoCapitalize = useMemo(
      (): Props['autoCapitalize'] => ifUndefined(autoCapitalize, 'none'),
      [autoCapitalize],
    );

    const finalAutoComplete = useMemo((): Props['autoComplete'] => {
      if (isAndroid) {
        if (autoComplete === undefined) {
          switch (type) {
            case 'email':
              return 'email';
            case 'userEmail':
              return 'username';
            case 'newPassword':
              return 'new-password';
            case 'oneTimeCode':
              return 'sms-otp';
            case 'password':
            case 'tel':
            case 'name':
            case 'nickname':
              return type;
          }
        } else {
          return autoComplete;
        }
      } else {
        return undefined;
      }
    }, [autoComplete, type]);

    const finalAutoCorrect = useMemo((): Props['autoCorrect'] => ifUndefined(autoCorrect, false), [autoCorrect]);

    /********************************************************************************************************************
     * Memo - placeholderTextColor
     * ******************************************************************************************************************/

    const finalPlaceholderTextColor = useMemo(() => {
      return ifUndefined(placeholderTextColor, theme.colors.textRight100);
    }, [placeholderTextColor, theme]);

    /********************************************************************************************************************
     * Memo - clearButtonMode
     * ******************************************************************************************************************/

    const finalClearButtonMode: Props['clearButtonMode'] = useMemo(() => {
      if (disabled) {
        return 'never';
      } else {
        if (clearButtonMode === undefined) {
          return type === 'password' || type === 'newPassword' ? 'never' : 'always';
        } else {
          return clearButtonMode;
        }
      }
    }, [type, disabled, clearButtonMode]);

    /********************************************************************************************************************
     * Memo - outline
     * ******************************************************************************************************************/

    const outlineColor: Props['outlineColor'] = useMemo(
      () => ifUndefined(initOutlineColor, 'rgba(0,0,0,0.1)'),
      [initOutlineColor],
    );

    const outlineStyle: Props['outlineStyle'] = useMemo(
      () => [
        disabled
          ? {
              borderRadius: 10,
              borderWidth: 1,
            }
          : {borderRadius: 10},
        focused ? undefined : {borderWidth: 1},
        initOutlineStyle,
      ],
      [disabled, focused, initOutlineStyle],
    );

    const activeOutlineColor = useMemo(
      () => (disabled || !focused ? outlineColor : initActiveOutlineColor),
      [disabled, initActiveOutlineColor, outlineColor, focused],
    );

    /********************************************************************************************************************
     * Memo - right
     * ******************************************************************************************************************/

    const finalRight: TextInputProps['right'] = useMemo(() => {
      if (right) {
        return right;
      } else if (contains(['password', 'newPassword'], type || 'text')) {
        return (
          useVisiblePassword &&
          showVisiblePassword && (
            <TextInput.Icon
              icon='eye'
              color={theme.colors.gray}
              size={finalFontSize * 1.2}
              style={{opacity: 0.7}}
              onPress={() => setVisiblePassword((old) => !old)}
            />
          )
        );
      } else {
        const clearButton = (
          <TextInput.Icon
            icon='close-circle'
            color={theme.colors.gray}
            size={finalFontSize * 1.2}
            style={{opacity: 0.7}}
            onPress={() => {
              innerValueRef.current = '';
              setValue(getFinalValue(''));
              setShowVisiblePassword(false);
              if (error !== false) {
                commandsRef.current?.validate();
              }
            }}
          />
        );

        switch (finalClearButtonMode) {
          case 'always':
            return showClear && clearButton;
          case 'while-editing':
            return focused && showClear && clearButton;
          case 'unless-editing':
            return !focused && showClear && clearButton;
        }
      }
    }, [
      error,
      finalClearButtonMode,
      finalFontSize,
      focused,
      getFinalValue,
      right,
      showClear,
      showVisiblePassword,
      theme.colors.gray,
      type,
      useVisiblePassword,
    ]);

    /********************************************************************************************************************
     * Event Handler
     * ******************************************************************************************************************/

    const handleFocus = useCallback(
      (e: any) => {
        if (selectTextOnFocus) {
          // e.currentTarget.setNativeProps({
          //   selection: {start: 0, end: innerValueRef.current?.length || 0},
          // });
        }

        setFocused(true);
        onFocus?.(e);
      },
      [onFocus, selectTextOnFocus],
    );

    const handleEndEditing = useCallback(
      (e: any) => {
        setFocused(false);
        onEndEditing?.(e);
      },
      [onEndEditing],
    );

    const handleSubmitEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (returnKeyType === 'next' && nextName) {
          if (commandsRef.current?.validate()) {
            formState?.focusControl(nextName);
          }
        }

        onSubmitEditing?.(e);
      },
      [returnKeyType, nextName, onSubmitEditing, formState],
    );

    const handleChangeText = useCallback(
      (text: string) => {
        innerValueRef.current = text;
        setValue(getFinalValue(text));
        setShowVisiblePassword(notEmpty(text));
        if (error !== false) {
          if (validateTimeoutRef.current) {
            clearTimeout(validateTimeoutRef.current);
            validateTimeoutRef.current = undefined;
          }
          validateTimeoutRef.current = delayTimeout(() => {
            validateTimeoutRef.current = undefined;
            commandsRef.current?.validate();
          }, 300);
        }
      },
      [error, getFinalValue],
    );

    const handleValidate = useCallback(
      (v: string | undefined) => {
        if (notEmpty(v) && validPattern) {
          if (!new RegExp(validPattern).test(v)) {
            return invalidPatternErrorText || '형식이 일치하지 않습니다.';
          }
        }
        if (notEmpty(v) && invalidPattern) {
          if (new RegExp(invalidPattern).test(v)) {
            return invalidPatternErrorText || '형식이 일치하지 않습니다.';
          }
        }
        if (onValidate) {
          return onValidate(v);
        }

        return true;
      },
      [invalidPattern, invalidPatternErrorText, onValidate, validPattern],
    );

    const handleChangeError = useCallback(
      (newError: false | string) => {
        setError(newError);
        onChangeError?.(newError);
      },
      [onChangeError],
    );

    /********************************************************************************************************************
     * Commands
     * ******************************************************************************************************************/

    const commands: Omit<
      FormTextCommands,
      Exclude<keyof FormControlCommands<FormTextValue>, 'focus' | 'setError'>
    > = useMemo(
      () => ({
        focus() {
          innerRef.current?.focus();
        },
        setError(newError: string) {
          setError(newError);
        },
        setValue(newValue: FormTextValue | undefined) {
          setValue(newValue);
        },
      }),
      [],
    );

    const handleGetCommands = useCallback(
      (baseCommands: FormControlCommands<FormTextValue>) => {
        let finalCommands = {
          ...baseCommands,
          ...commands,
        };

        if ($onGetCommands) {
          finalCommands = $onGetCommands(finalCommands);
        }

        commandsRef.current = finalCommands;

        if (ref) {
          if (typeof ref === 'function') {
            ref(finalCommands);
          } else {
            ref.current = finalCommands;
          }
        }

        return finalCommands;
      },
      [$onGetCommands, commands, ref],
    );

    /********************************************************************************************************************
     * Render
     * ******************************************************************************************************************/

    return (
      <View>
        <FormControl
          $controlType={ifUndefined($controlType, 'text')}
          component={
            <>
              <CustomComponent
                ref={innerRef}
                theme={theme}
                component={TextInput}
                componentProps={{left: left, right: finalRight}}
                mode={mode}
                style={finalStyle}
                error={!!error}
                editable={!disabled}
                multiline={multiline}
                textColor={theme.colors.textAccent}
                selectionColor={theme.colors.primary}
                cursorColor={theme.colors.primary}
                activeOutlineColor={activeOutlineColor}
                outlineColor={outlineColor}
                outlineStyle={outlineStyle}
                backgroundColor={finalBackgroundColor}
                returnKeyType={returnKeyType}
                blurOnSubmit={blurOnSubmit}
                secureTextEntry={visiblePassword ? false : finalSecureTextEntry}
                inputMode={finalInputMode}
                keyboardType={finalKeyboardType}
                textContentType={finalTextContentType}
                selectTextOnFocus={selectTextOnFocus}
                autoCapitalize={finalAutoCapitalize}
                autoComplete={finalAutoComplete}
                autoCorrect={finalAutoCorrect}
                paddingRight={paddingRight}
                placeholderTextColor={finalPlaceholderTextColor}
                clearButtonMode='never'
                value={value}
                onChangeText={handleChangeText}
                onFocus={handleFocus}
                onEndEditing={handleEndEditing}
                onSubmitEditing={handleSubmitEditing}
                {...props}
              />
              {children}
            </>
          }
          name={name}
          label={label}
          labelStyle={labelStyle}
          labelHelperText={labelHelperText}
          required={required}
          error={error}
          hideErrorText={hideErrorText}
          errorHelperTextColor={errorHelperTextColor}
          helperText={helperText}
          value={value}
          $onGetCommands={handleGetCommands}
          onChange={onChange}
          onValidate={handleValidate}
          onChangeError={handleChangeError}
        />
      </View>
    );
  },
);

const WithStaticFormText = withStaticProps(FormText, {
  Icon: TextInput.Icon,
  Affix: TextInput.Affix,
});

export default WithStaticFormText;
