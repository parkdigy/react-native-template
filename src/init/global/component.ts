import {
  Animated as _Animated,
  TextInput as _NativeTextInput,
  View as _NativeView,
  TouchableOpacity as _NativeTouchableOpacity,
  Pressable as _NativePressable,
} from 'react-native';
import {ScrollView as _NativeScrollView} from 'react-native-gesture-handler';
import {Button as _PaperButton} from 'react-native-paper';
import {Animation as _Animation} from 'react-native-animatable';
import {
  Modal as _Modal,
  ModalProps as _ModalProps,
  Dialog as _Dialog,
  DialogProps as _DialogProps,
  FullScreenDialog as _FullScreenDialog,
  Appbar as _Appbar,
  HeaderAppbar as _HeaderAppbar,
  ActivityIndicator as _ActivityIndicator,
  Pressable as _Pressable,
  TouchableOpacity as _TouchableOpacity,
  View as _View,
  ViewProps as _ViewProps,
  ShadowView as _ShadowView,
  SafeAreaView as _SafeAreaView,
  ScrollView as _ScrollView,
  Stack as _Stack,
  Panel as _Panel,
  PanelItem as _PanelItem,
  PanelDivider as _PanelDivider,
  AgreementPanel as _AgreementPanel,
  AgreementPanelItem as _AgreementPanelItem,
  InfoPanel as _InfoPanel,
  InfoPanelItem as _InfoPanelItem,
  PanelValueList as _PanelValueList,
  Text as _Text,
  TextProps as _TextProps,
  TextSize as _TextSize,
  Text_Default as _Text_Default,
  Text_Accent as _Text_Accent,
  Text_ExtraAccent as _Text_ExtraAccent,
  Text_Error as _Text_Error,
  Text_Primary as _Text_Primary,
  Text_Primary100 as _Text_Primary100,
  Text_Primary200 as _Text_Primary200,
  Text_Primary300 as _Text_Primary300,
  Text_Primary400 as _Text_Primary400,
  Text_PrimaryAccent as _Text_PrimaryAccent,
  Text_Secondary as _Text_Secondary,
  Text_Right100 as _Text_Right100,
  Text_Right200 as _Text_Right200,
  Text_Success as _Text_Success,
  Text_White as _Text_White,
  Text_Black as _Text_Black,
  Text_Gray as _Text_Gray,
  TimerText as _TimerText,
  Button as _Button,
  ButtonProps as _ButtonProps,
  ButtonSize as _ButtonSize,
  SubmitButton as _SubmitButton,
  DetailButton as _DetailButton,
  Icon as _Icon,
  Divider as _Divider,
  DividerSkeletonPlaceholder as _DividerSkeletonPlaceholder,
  AutoResizeImage as _AutoResizeImage,
  PngImage as _PngImage,
  GrayscaleImage as _GrayscaleImage,
  ContainerView as _ContainerView,
  ContainerScrollView as _ContainerScrollView,
  KeyboardAwareScrollView as _KeyboardAwareScrollView,
  KeyboardAwareContainerScrollView as _KeyboardAwareContainerScrollView,
  Form as _Form,
  useFormState as _useFormState,
  FormCheckbox as _FormCheckbox,
  FormSearchText as _FormSearchText,
  FormSegment as _FormSegment,
  FormText as _FormText,
  FormEmail as _FormEmail,
  FormPassword as _FormPassword,
  FormMobile as _FormMobile,
  FormTel as _FormTel,
  FormNumber as _FormNumber,
  FormTextarea as _FormTextarea,
  FormToggleButtonGroup as _FormToggleButtonGroup,
  FormSelect as _FormSelect,
  FormSwitch as _FormSwitch,
  Label as _Label,
  HomeTitle as _HomeTitle,
  TabBar as _TabBar,
  LabelValueList as _LabelValueList,
  ValueList as _ValueList,
  BulletValueList as _BulletValueList,
  RadioButton as _RadioButton,
  Loading as _Loading,
  BackAlert as _BackAlert,
  ApiErrorBackAlert as _ApiErrorBackAlert,
  DateText as _DateText,
  AutoHeightWebView as _AutoHeightWebView,
  ApiFlatList as _ApiFlatList,
  ApiSectionList as _ApiSectionList,
  ApiTabSectionList as _ApiTabSectionList,
  ApiInfoView as _ApiInfoView,
  SkeletonPlaceholder as _SkeletonPlaceholder,
  ActiveDetector as _ActiveDetector,
  Animatable as _Animatable,
} from '@ccomp';

declare global {
  namespace Animatable {
    type Animation = _Animation;
  }
  namespace Animated {
    type WithAnimatedValue<T> = _Animated.WithAnimatedValue<T>;
  }
}

declare global {
  /** react-native */
  var Animatable: typeof _Animatable;

  /** react-native-animatable */
  var Animated: typeof _Animated;

  /** react-native */

  var NativeTextInput: typeof _NativeTextInput;
  type NativeTextInput = _NativeTextInput;
  var NativeView: typeof _NativeView;
  type NativeView = _NativeView;
  var NativeScrollView: typeof _NativeScrollView;
  type NativeScrollView = _NativeScrollView;
  var NativeTouchableOpacity: typeof _NativeTouchableOpacity;
  var NativePressable: typeof _NativePressable;
  type NativePressable = NativeView;

  /** react-native-paper */
  var PaperButton: typeof _PaperButton;
  type PaperButton = NativeView;

  /** custom */
  var Modal: typeof _Modal;
  type ModalProps = _ModalProps;
  var Dialog: typeof _Dialog;
  type DialogProps = _DialogProps;
  var FullScreenDialog: typeof _FullScreenDialog;
  var Appbar: typeof _Appbar;
  var HeaderAppbar: typeof _HeaderAppbar;
  var ActivityIndicator: typeof _ActivityIndicator;
  var Pressable: typeof _Pressable;
  var TouchableOpacity: typeof _TouchableOpacity;
  var View: typeof _View;
  type ViewProps = _ViewProps;
  var ShadowView: typeof _ShadowView;
  var SafeAreaView: typeof _SafeAreaView;
  var ScrollView: typeof _ScrollView;
  var Stack: typeof _Stack;
  var Panel: typeof _Panel;
  var PanelItem: typeof _PanelItem;
  var PanelDivider: typeof _PanelDivider;
  var AgreementPanel: typeof _AgreementPanel;
  var AgreementPanelItem: typeof _AgreementPanelItem;
  var InfoPanel: typeof _InfoPanel;
  var InfoPanelItem: typeof _InfoPanelItem;
  var PanelValueList: typeof _PanelValueList;
  var Text: typeof _Text;
  type TextProps = _TextProps;
  type TextSize = _TextSize;
  var TextSize: typeof _TextSize;
  var Text_Default: typeof _Text_Default;
  var Text_Accent: typeof _Text_Accent;
  var Text_ExtraAccent: typeof _Text_ExtraAccent;
  var Text_Error: typeof _Text_Error;
  var Text_Primary: typeof _Text_Primary;
  var Text_Primary100: typeof _Text_Primary100;
  var Text_Primary200: typeof _Text_Primary200;
  var Text_Primary300: typeof _Text_Primary300;
  var Text_Primary400: typeof _Text_Primary400;
  var Text_PrimaryAccent: typeof _Text_PrimaryAccent;
  var Text_Secondary: typeof _Text_Secondary;
  var Text_Right100: typeof _Text_Right100;
  var Text_Right200: typeof _Text_Right200;
  var Text_Success: typeof _Text_Success;
  var Text_White: typeof _Text_White;
  var Text_Black: typeof _Text_Black;
  var Text_Gray: typeof _Text_Gray;
  var TimerText: typeof _TimerText;
  var Button: typeof _Button;
  type ButtonProps = _ButtonProps;
  type ButtonSize = _ButtonSize;
  var ButtonSize: typeof _ButtonSize;
  var Icon: typeof _Icon;
  var SubmitButton: typeof _SubmitButton;
  var DetailButton: typeof _DetailButton;
  var Divider: typeof _Divider;
  var DividerSkeletonPlaceholder: typeof _DividerSkeletonPlaceholder;
  var AutoResizeImage: typeof _AutoResizeImage;
  var PngImage: typeof _PngImage;
  var GrayscaleImage: typeof _GrayscaleImage;
  var ContainerView: typeof _ContainerView;
  var ContainerScrollView: typeof _ContainerScrollView;
  var KeyboardAwareScrollView: typeof _KeyboardAwareScrollView;
  var KeyboardAwareContainerScrollView: typeof _KeyboardAwareContainerScrollView;

  var Form: typeof _Form;
  var useFormState: typeof _useFormState;
  var FormCheckbox: typeof _FormCheckbox;
  var FormSearchText: typeof _FormSearchText;
  var FormSegment: typeof _FormSegment;
  var FormText: typeof _FormText;
  var FormEmail: typeof _FormEmail;
  var FormPassword: typeof _FormPassword;
  var FormMobile: typeof _FormMobile;
  var FormTel: typeof _FormTel;
  var FormNumber: typeof _FormNumber;
  var FormTextarea: typeof _FormTextarea;
  var FormToggleButtonGroup: typeof _FormToggleButtonGroup;
  var FormSelect: typeof _FormSelect;
  var FormSwitch: typeof _FormSwitch;

  var Label: typeof _Label;
  var HomeTitle: typeof _HomeTitle;
  var TabBar: typeof _TabBar;
  var LabelValueList: typeof _LabelValueList;
  var ValueList: typeof _ValueList;
  var BulletValueList: typeof _BulletValueList;
  var RadioButton: typeof _RadioButton;
  var Loading: typeof _Loading;
  var BackAlert: typeof _BackAlert;
  var ApiErrorBackAlert: typeof _ApiErrorBackAlert;
  var DateText: typeof _DateText;
  var AutoHeightWebView: typeof _AutoHeightWebView;
  var ApiFlatList: typeof _ApiFlatList;
  var ApiSectionList: typeof _ApiSectionList;
  var ApiTabSectionList: typeof _ApiTabSectionList;
  var ApiInfoView: typeof _ApiInfoView;
  var SkeletonPlaceholder: typeof _SkeletonPlaceholder;
  var ActiveDetector: typeof _ActiveDetector;
}

globalThis.Animated = _Animated;
globalThis.Animatable = _Animatable;

globalThis.NativeTextInput = _NativeTextInput;
globalThis.NativeView = _NativeView;
globalThis.NativeScrollView = _NativeScrollView;
globalThis.NativeTouchableOpacity = _NativeTouchableOpacity;
globalThis.NativePressable = _NativePressable;

globalThis.PaperButton = _PaperButton;

globalThis.Modal = _Modal;
globalThis.Dialog = _Dialog;
globalThis.FullScreenDialog = _FullScreenDialog;
globalThis.Appbar = _Appbar;
globalThis.HeaderAppbar = _HeaderAppbar;
globalThis.ActivityIndicator = _ActivityIndicator;
globalThis.Pressable = _Pressable;
globalThis.TouchableOpacity = _TouchableOpacity;
globalThis.View = _View;
globalThis.ShadowView = _ShadowView;
globalThis.SafeAreaView = _SafeAreaView;
globalThis.ScrollView = _ScrollView;
globalThis.Stack = _Stack;
globalThis.Panel = _Panel;
globalThis.PanelItem = _PanelItem;
globalThis.PanelDivider = _PanelDivider;
globalThis.AgreementPanel = _AgreementPanel;
globalThis.AgreementPanelItem = _AgreementPanelItem;
globalThis.InfoPanel = _InfoPanel;
globalThis.InfoPanelItem = _InfoPanelItem;
globalThis.PanelValueList = _PanelValueList;
globalThis.Text = _Text;
globalThis.TextSize = _TextSize;
globalThis.Text_Default = _Text_Default;
globalThis.Text_Accent = _Text_Accent;
globalThis.Text_ExtraAccent = _Text_ExtraAccent;
globalThis.Text_Error = _Text_Error;
globalThis.Text_Primary = _Text_Primary;
globalThis.Text_Primary100 = _Text_Primary100;
globalThis.Text_Primary200 = _Text_Primary200;
globalThis.Text_Primary300 = _Text_Primary300;
globalThis.Text_Primary400 = _Text_Primary400;
globalThis.Text_PrimaryAccent = _Text_PrimaryAccent;
globalThis.Text_Secondary = _Text_Secondary;
globalThis.Text_Right100 = _Text_Right100;
globalThis.Text_Right200 = _Text_Right200;
globalThis.Text_Success = _Text_Success;
globalThis.Text_White = _Text_White;
globalThis.Text_Black = _Text_Black;
globalThis.Text_Gray = _Text_Gray;
globalThis.TimerText = _TimerText;
globalThis.Button = _Button;
globalThis.ButtonSize = _ButtonSize;
globalThis.SubmitButton = _SubmitButton;
globalThis.DetailButton = _DetailButton;
globalThis.Icon = _Icon;
globalThis.Divider = _Divider;
globalThis.DividerSkeletonPlaceholder = _DividerSkeletonPlaceholder;
globalThis.AutoResizeImage = _AutoResizeImage;
globalThis.PngImage = _PngImage;
globalThis.GrayscaleImage = _GrayscaleImage;
globalThis.ContainerView = _ContainerView;
globalThis.ContainerScrollView = _ContainerScrollView;
globalThis.KeyboardAwareScrollView = _KeyboardAwareScrollView;
globalThis.KeyboardAwareContainerScrollView = _KeyboardAwareContainerScrollView;
globalThis.Form = _Form;
globalThis.useFormState = _useFormState;
globalThis.FormCheckbox = _FormCheckbox;
globalThis.FormSearchText = _FormSearchText;
globalThis.FormSegment = _FormSegment;
globalThis.FormText = _FormText;
globalThis.FormEmail = _FormEmail;
globalThis.FormPassword = _FormPassword;
globalThis.FormMobile = _FormMobile;
globalThis.FormTel = _FormTel;
globalThis.FormNumber = _FormNumber;
globalThis.FormTextarea = _FormTextarea;
globalThis.FormToggleButtonGroup = _FormToggleButtonGroup;
globalThis.FormSelect = _FormSelect;
globalThis.FormSwitch = _FormSwitch;
globalThis.Label = _Label;
globalThis.HomeTitle = _HomeTitle;
globalThis.TabBar = _TabBar;
globalThis.LabelValueList = _LabelValueList;
globalThis.ValueList = _ValueList;
globalThis.BulletValueList = _BulletValueList;
globalThis.RadioButton = _RadioButton;
globalThis.Loading = _Loading;
globalThis.BackAlert = _BackAlert;
globalThis.ApiErrorBackAlert = _ApiErrorBackAlert;
globalThis.DateText = _DateText;
globalThis.AutoHeightWebView = _AutoHeightWebView;
globalThis.ApiFlatList = _ApiFlatList;
globalThis.ApiSectionList = _ApiSectionList;
globalThis.ApiTabSectionList = _ApiTabSectionList;
globalThis.ApiInfoView = _ApiInfoView;
globalThis.SkeletonPlaceholder = _SkeletonPlaceholder;
globalThis.ActiveDetector = _ActiveDetector;

export {};
