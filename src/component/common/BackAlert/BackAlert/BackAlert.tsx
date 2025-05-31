/********************************************************************************************************************
 * 오류 표시 컴포넌트
 * ******************************************************************************************************************/

import React from 'react';
import {IconAlertDiamond, IconNoData} from '@asset-image';
import {BackAlertProps as Props} from './BackAlert.types';
import styled from 'styled-components/native';
import {Stack} from '../../Stack';
import {Text} from '../../Text';

const BackAlert: React.FC<Props> = ({
  icon,
  iconColor,
  text,
  textColor,
  textFontSize,
  textBold,
  retryButtonText,
  retryButtonProps,
  closeButtonText,
  closeButtonProps,
  style,
  pv,
  onRetryPress,
  onClosePress,
  onLayout,
}) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const theme = useTheme();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const finalRetryButtonProps: Props['retryButtonProps'] = useMemo(() => {
    if (retryButtonProps) {
      const {color, ...other} = retryButtonProps;
      return {
        color: color || 'gray',
        ...other,
      };
    } else {
      return {color: 'gray'};
    }
  }, [retryButtonProps]);

  const finalCloseButtonProps: Props['closeButtonProps'] = useMemo(() => {
    if (closeButtonProps) {
      const {color, ...other} = closeButtonProps;
      return {
        color: color || 'gray',
        mode: 'outlined',
        ...other,
      };
    } else {
      return {color: 'gray', mode: 'outlined'};
    }
  }, [closeButtonProps]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <StyledContainerStack style={style} spacing={10} pv={pv} onLayout={onLayout}>
      {icon && (
        <StyledIconContainerView>
          {icon === 'emptyList' && <IconNoData width={40} height={40} fill={iconColor || theme.colors.onSurface} />}
          {contains(['info', 'error'], icon) && (
            <IconAlertDiamond width={40} height={40} fill={iconColor || theme.colors.onSurface} />
          )}
        </StyledIconContainerView>
      )}
      {text && (
        <StyledTextContainerView>
          <StyledText mt={6} color={textColor} fontSize={textFontSize} bold={textBold}>
            {text}
          </StyledText>
        </StyledTextContainerView>
      )}

      {(onRetryPress || onClosePress) && (
        <Stack row center justifyContent='center' spacing={10}>
          {onClosePress && (
            <StyledButtonContainerView>
              <Button {...finalCloseButtonProps} onPress={onClosePress}>
                {ifUndefined(closeButtonText, '닫기')}
              </Button>
            </StyledButtonContainerView>
          )}
          {onRetryPress && (
            <StyledButtonContainerView>
              <Button {...finalRetryButtonProps} onPress={onRetryPress}>
                {ifUndefined(retryButtonText, '확인')}
              </Button>
            </StyledButtonContainerView>
          )}
        </Stack>
      )}
    </StyledContainerStack>
  );
};

export default BackAlert;

/********************************************************************************************************************
 * Styled Components
 * ******************************************************************************************************************/

export const StyledContainerStack = styled(Stack)`
  flex: 1;
  height: 100%;
  justify-content: center;
`;

export const StyledIconContainerView = styled.View`
  align-items: center;
  opacity: 0.7;
`;

export const StyledTextContainerView = styled.View`
  align-items: center;
`;

export const StyledText = styled(Text)`
  text-align: center;
  opacity: 0.8;
  line-height: 23px;
`;

export const StyledButtonContainerView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;
`;
