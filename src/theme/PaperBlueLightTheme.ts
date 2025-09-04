import {DefaultTheme} from 'react-native-paper';

export default {
  ...DefaultTheme,
  dark: false,
  colors: {
    transparent: 'transparent',
    // primary
    primary: '#2368E7',
    onPrimary: '#FFFFFF',
    primaryContainer: 'rgb(212, 227, 255)',
    onPrimaryContainer: 'rgb(0, 28, 58)',
    primaryAccent: '#083B99',
    primary100: '#4D607C',
    onPrimary100: '#FFFFFF',
    primary200: '#8B9CB6',
    onPrimary200: '#FFFFFF',
    primary300: '#BCC7D8',
    onPrimary300: '#FFFFFF',
    primary400: '#D8DFEA',
    onPrimary400: '#696969',
    primary500: '#E6EAF1',
    onPrimary500: '#696969',
    // secondary
    secondary: 'rgb(85, 95, 113)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(216, 227, 248)',
    onSecondaryContainer: 'rgb(17, 28, 43)',
    // tertiary
    tertiary: '#5c5b7d',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#e3dfff',
    onTertiaryContainer: '#191836',
    // error
    error: '#EF1E1E',
    onError: '#FFFFFF',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    // warning
    warning: '#ff8800',
    onWarning: '#FFFFFF',
    warningContainer: '#fff56d',
    onWarningContainer: '#7f0800',
    // success
    success: '#00b300',
    onSuccess: '#FFFFFF',
    successContainer: '#b2ffb2',
    onSuccessContainer: '#003300',
    // gray
    gray: '#6c757d',
    onGray: '#FFFFFF',
    grayContainer: '#d2dbe3',
    onGrayContainer: '#1f2830',
    // blue gray
    blueGray: '#78909C',
    onBlueGray: '#FFFFFF',
    blueGrayContainer: '#c4dce8',
    onBlueGrayContainer: '#122a36',
    // surface
    surface: '#FFFFFF',
    onSurface: '#696969', // 기본 텍스트
    surfaceVariant: 'rgb(224, 226, 236)',
    onSurfaceVariant: 'rgb(67, 71, 78)',
    // surface disabled
    surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
    // outline
    outline: 'rgb(116, 119, 127)',
    outlineVariant: 'rgb(195, 198, 207)',
    // inverse
    inverseSurface: 'rgb(47, 48, 51)',
    inverseOnSurface: 'rgb(241, 240, 244)',
    inversePrimary: 'rgb(166, 200, 255)',
    // elevation
    elevation: {
      level0: 'transparent',
      level1: 'rgb(240, 244, 251)',
      level2: 'rgb(233, 239, 249)',
      level3: 'rgb(225, 235, 246)',
      level4: 'rgb(223, 233, 245)',
      level5: 'rgb(218, 230, 244)',
    },
    // backdrop
    backdrop: 'rgba(45, 49, 56, 0.4)',
    // shadow
    shadow: '#777777',
    // scrim
    scrim: 'rgb(0, 0, 0)',
    // white
    white: '#FFFFFF',
    // black
    black: '#000000',
    // background
    background: '#F3F5F8',
    onBackground: '#1A1C1EFF',
    bgPrimary: '#FFFFFF',
    bgAppList: '#EBEEF2',
    bgPagination: '#D6D6D6',
    bgHomeIndicator: '#000000',
    bgModal: 'rgba(255, 255, 255, 0.5)',
    // divider
    divider: 'rgba(0, 0, 0, 0.1)',
    // text
    textAccent: '#222222',
    textRight100: '#999999',
    textRight200: '#bbbbbb',
    // green
    green100: '#8DF9F9',
    onGreen100: '#FFFFFF',
    green200: '#2CDDDD',
    onGreen200: '#FFFFFF',
    green300: '#00B0B0',
    onGreen300: '#FFFFFF',
    green400: '#027A7A',
    onGreen400: '#FFFFFF',
    // yellow
    yellow: '#FFD72B',
    // purple
    purple: '#7F32F9',
    onPurple: '#FFFFFF',
    purpleLine: '#B284FB',
    // splash
    splashBackground: '#F3F5F8',
    // panel
    panelTitle: darken('#696969', 5),
    // opacity
    opacity05: 'rgba(0, 0, 0, 0.05)',
    opacity10: 'rgba(0, 0, 0, 0.1)',
    opacity15: 'rgba(0, 0, 0, 0.15)',
    opacity20: 'rgba(0, 0, 0, 0.2)',
    opacity25: 'rgba(0, 0, 0, 0.25)',
    opacity30: 'rgba(0, 0, 0, 0.3)',
    opacity35: 'rgba(0, 0, 0, 0.35)',
    opacity40: 'rgba(0, 0, 0, 0.4)',
    opacity45: 'rgba(0, 0, 0, 0.45)',
    opacity50: 'rgba(0, 0, 0, 0.5)',
    opacity55: 'rgba(0, 0, 0, 0.55)',
    opacity60: 'rgba(0, 0, 0, 0.6)',
    opacity65: 'rgba(0, 0, 0, 0.65)',
    opacity70: 'rgba(0, 0, 0, 0.7)',
    opacity75: 'rgba(0, 0, 0, 0.75)',
    opacity80: 'rgba(0, 0, 0, 0.8)',
    opacity85: 'rgba(0, 0, 0, 0.85)',
    opacity90: 'rgba(0, 0, 0, 0.9)',
    opacity95: 'rgba(0, 0, 0, 0.95)',
    opacity100: 'rgba(0, 0, 0, 1)',
    // opacity reverse
    opacityReverse05: 'rgba(255,255,255,0.05)',
    opacityReverse10: 'rgba(255,255,255,0.10)',
    opacityReverse15: 'rgba(255,255,255,0.15)',
    opacityReverse20: 'rgba(255,255,255,0.20)',
    opacityReverse25: 'rgba(255,255,255,0.25)',
    opacityReverse30: 'rgba(255,255,255,0.30)',
    opacityReverse35: 'rgba(255,255,255,0.35)',
    opacityReverse40: 'rgba(255,255,255,0.40)',
    opacityReverse45: 'rgba(255,255,255,0.45)',
    opacityReverse50: 'rgba(255,255,255,0.50)',
    opacityReverse55: 'rgba(255,255,255,0.55)',
    opacityReverse60: 'rgba(255,255,255,0.60)',
    opacityReverse65: 'rgba(255,255,255,0.65)',
    opacityReverse70: 'rgba(255,255,255,0.70)',
    opacityReverse75: 'rgba(255,255,255,0.75)',
    opacityReverse80: 'rgba(255,255,255,0.80)',
    opacityReverse85: 'rgba(255,255,255,0.85)',
    opacityReverse90: 'rgba(255,255,255,0.90)',
    opacityReverse95: 'rgba(255,255,255,0.95)',
    opacityReverse100: 'rgba(255,255,255,1)',
  },
};
