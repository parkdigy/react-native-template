module.exports = {
  env: {
    'react-native/react-native': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  plugins: ['@typescript-eslint', 'import', 'react'],
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        directory: './src',
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        arrowParens: 'always',
        bracketSameLine: true,
        bracketSpacing: false,
        singleQuote: true,
        jsxSingleQuote: true,
        useTabs: false,
        trailingComma: 'all',
        semi: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    'no-undef': 'error',
    'jsx-quotes': 'off',
    'react/display-name': 'off',
    'react/jsx-no-undef': ['error', {allowGlobals: true}],
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-native/no-inline-styles': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-color-literals': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'eslint-comments/no-unlimited-disable': 'off',
    'import/no-unresolved': 'error',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/export': 'off',
    'import/order': [
      'error',
      {
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
      },
    ],
  },
  globals: {
    // @react-navigation
    ReactNavigation: 'readonly',

    // global
    globalThis: 'readonly',

    // nodejs
    NodeJS: 'readonly',

    // ll
    ll: 'readonly',

    // react
    ReactNode: 'readonly',
    withStaticProps: 'readonly',
    useId: 'readonly',
    useRef: 'readonly',
    useState: 'readonly',
    useLayoutEffect: 'readonly',
    useEffect: 'readonly',
    useCallback: 'readonly',
    useMemo: 'readonly',
    useMountedRef: 'readonly',

    // react-native
    Keyboard: 'readonly',
    Platform: 'readonly',
    isIos: 'readonly',
    isAndroid: 'readonly',

    // adid
    DEFAULT_ADID: 'readonly',

    // common
    animations: 'readonly',
    api: 'readonly',
    app: 'readonly',
    storage: 'readonly',
    text: 'readonly',
    util: 'readonly',

    // timeout
    delayTimeout: 'readonly',

    // color
    rgbToHex: 'readonly',
    lighten: 'readonly',
    darken: 'readonly',

    // isEmulator
    isEmulator: 'readonly',

    // lazy
    LazyComponent: 'readonly',

    // theme
    ReactNativePaperTheme: 'readonly',
    StyledReactNativePaperTheme: 'readonly',
    useTheme: 'readonly',

    // Const
    Const: 'readonly',

    // Api
    Api: 'readonly',

    // PdgUtil - compare
    empty: 'readonly',
    notEmpty: 'readonly',
    equal: 'readonly',
    contains: 'readonly',
    ifNull: 'readonly',
    ifNotNull: 'readonly',
    ifUndefined: 'readonly',
    ifNotUndefined: 'readonly',
    ifNullOrUndefined: 'readonly',
    ifNotNullAndUndefined: 'readonly',
    isEmail: 'readonly',

    // PdgUtil - types
    ValueOf: 'readonly',
    Dict: 'readonly',
    Arr: 'readonly',
    IsObject: 'readonly',
    IsArray: 'readonly',
    ObjectMerge: 'readonly',
    ArrayMerge: 'readonly',
    PartialPick: 'readonly',
    PartialOmit: 'readonly',
    RequiredPick: 'readonly',
    RequiredOmit: 'readonly',

    // PdgUtil - date
    now: 'readonly',
    nowJs: 'readonly',
    nowTime: 'readonly',

    // PdgUtil - data
    lv: 'readonly',
    vl: 'readonly',
    copy: 'readonly',

    // PdgUtil - number
    numberFormat: 'readonly',

    // PdgUtil - delay
    nextTick: 'readonly',

    // component - react-native
    Animated: 'readonly',

    // component - react-native-animatable
    Animatable: 'readonly',

    // component - react-native
    NativeTextInput: 'readonly',
    NativeView: 'readonly',
    NativeScrollView: 'readonly',
    NativeTouchableOpacity: 'readonly',
    NativePressable: 'readonly',

    // component - react-native-paper
    PaperButton: 'readonly',

    // component - custom
    Modal: 'readonly',
    ModalProps: 'readonly',
    Dialog: 'readonly',
    DialogProps: 'readonly',
    FullScreenDialog: 'readonly',
    Appbar: 'readonly',
    HeaderAppbar: 'readonly',
    ActivityIndicator: 'readonly',
    View: 'readonly',
    ViewProps: 'readonly',
    ShadowView: 'readonly',
    Pressable: 'readonly',
    TouchableOpacity: 'readonly',
    SafeAreaView: 'readonly',
    ScrollView: 'readonly',
    Stack: 'readonly',
    Panel: 'readonly',
    PanelItem: 'readonly',
    PanelDivider: 'readonly',
    AgreementPanel: 'readonly',
    AgreementPanelItem: 'readonly',
    InfoPanel: 'readonly',
    InfoPanelItem: 'readonly',
    PanelValueList: 'readonly',
    Text: 'readonly',
    TextProps: 'readonly',
    TextSize: 'readonly',
    TimerText: 'readonly',
    Button: 'readonly',
    ButtonProps: 'readonly',
    ButtonSize: 'readonly',
    SubmitButton: 'readonly',
    DetailButton: 'readonly',
    Icon: 'readonly',
    Divider: 'readonly',
    DividerSkeletonPlaceholder: 'readonly',
    AutoResizeImage: 'readonly',
    PngImage: 'readonly',
    GrayscaleImage: 'readonly',
    ContainerView: 'readonly',
    ContainerScrollView: 'readonly',
    KeyboardAwareScrollView: 'readonly',
    KeyboardAwareContainerScrollView: 'readonly',
    Form: 'readonly',
    useFormState: 'readonly',
    FormCheckbox: 'readonly',
    FormSearchText: 'readonly',
    FormSegment: 'readonly',
    FormText: 'readonly',
    FormEmail: 'readonly',
    FormPassword: 'readonly',
    FormMobile: 'readonly',
    FormTel: 'readonly',
    FormNumber: 'readonly',
    FormTextarea: 'readonly',
    FormToggleButtonGroup: 'readonly',
    FormSelect: 'readonly',
    FormSwitch: 'readonly',
    Step: 'readonly',
    Label: 'readonly',
    HomeTitle: 'readonly',
    TabBar: 'readonly',
    LabelValueList: 'readonly',
    ValueList: 'readonly',
    BulletValueList: 'readonly',
    RadioButton: 'readonly',
    Loading: 'readonly',
    BackAlert: 'readonly',
    ApiErrorBackAlert: 'readonly',
    DateText: 'readonly',
    AutoHeightWebView: 'readonly',
    ApiFlatList: 'readonly',
    ApiSectionList: 'readonly',
    ApiTabSectionList: 'readonly',
    ApiInfoView: 'readonly',
    SkeletonPlaceholder: 'readonly',
    ActiveDetector: 'readonly',
  },
};
