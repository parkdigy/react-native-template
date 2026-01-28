import {type StackScreenProps} from '@react-navigation/stack';
import {type FirstLetter, type UpperLetter} from '@pdg/types';

/********************************************************************************************************************
 * params
 * ******************************************************************************************************************/

type NoParams = undefined;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OptionalParam<T> = T & {$$Optional$$?: true};

// 공지사항 정보 파라미터
interface NoticeInfoParam {
  info: {
    id: number;
    title?: string;
    notice_date?: string;
  };
}

/********************************************************************************************************************
 * ScreenListToConst
 * ******************************************************************************************************************/

type ScreenListToConst<T> = {[Key in keyof T]: IsScreen<T[Key]> extends never ? ScreenListToConst<T[Key]> : undefined};

/********************************************************************************************************************
 * 메인 홈 탭
 * ******************************************************************************************************************/

export type MainTabHomeScreenList = {
  Home: NoParams;
};
export const MainTabHomeScreenList: ScreenListToConst<MainTabHomeScreenList> = {
  Home: undefined,
};

/********************************************************************************************************************
 * 메인 Tab 1 탭
 * ******************************************************************************************************************/

export type MainTab1ScreenList = {
  Tab1Home: NoParams;
};
export const MainTab1ScreenList: ScreenListToConst<MainTab1ScreenList> = {
  Tab1Home: undefined,
};

/********************************************************************************************************************
 * 메인 Tab 2 탭
 * ******************************************************************************************************************/

export type MainTab2ScreenList = {
  Tab2Home: NoParams;
};
export const MainTab2ScreenList: ScreenListToConst<MainTab2ScreenList> = {
  Tab2Home: undefined,
};

/********************************************************************************************************************
 * 메인 Tab 3 탭
 * ******************************************************************************************************************/

export type MainTab3ScreenList = {
  Tab3Home: NoParams;
};
export const MainTab3ScreenList: ScreenListToConst<MainTab3ScreenList> = {
  Tab3Home: undefined,
};

/********************************************************************************************************************
 * 메인 더보기 탭
 * ******************************************************************************************************************/

export type MainTabMoreScreenList = {
  MoreHome: NoParams;
};
export const MainTabMoreScreenList: ScreenListToConst<MainTabMoreScreenList> = {
  MoreHome: undefined,
};

/********************************************************************************************************************
 * 메인 탭
 * ******************************************************************************************************************/

export type MainTabScreenList = {
  MainTabHome: MainTabHomeScreenList;
  MainTab1: MainTab1ScreenList;
  MainTab2: MainTab2ScreenList;
  MainTab3: MainTab3ScreenList;
  MainTabMore: MainTabMoreScreenList;
};
export const MainTabScreenList: ScreenListToConst<MainTabScreenList> = {
  MainTabHome: MainTabHomeScreenList,
  MainTab1: MainTab1ScreenList,
  MainTab2: MainTab2ScreenList,
  MainTab3: MainTab3ScreenList,
  MainTabMore: MainTabMoreScreenList,
};

/********************************************************************************************************************
 * 메인
 * ******************************************************************************************************************/

export type MainScreenList = {
  MainTab: MainTabScreenList;
  AuthSignIn: NoParams;
  MyResignForm: NoParams;
  MyNicknameChange: NoParams;
  ThemeSettings: NoParams;
  NotificationSettings: NoParams;
  NoticeList: NoParams;
  NoticeInfo: NoticeInfoParam;
  FaqList: NoParams;
  TermsOfPrivacy: NoParams;
  TermsOfService: NoParams;
};
export const MainScreenList: ScreenListToConst<MainScreenList> = {
  MainTab: MainTabScreenList,
  AuthSignIn: undefined,
  MyResignForm: undefined,
  MyNicknameChange: undefined,
  ThemeSettings: undefined,
  NotificationSettings: undefined,
  NoticeList: undefined,
  NoticeInfo: undefined,
  FaqList: undefined,
  TermsOfPrivacy: undefined,
  TermsOfService: undefined,
};

/********************************************************************************************************************
 * Root
 * ******************************************************************************************************************/

export type RootScreenList = {
  Main: MainScreenList;
};
export const RootScreenList: ScreenListToConst<RootScreenList> = {
  Main: MainScreenList,
};

/********************************************************************************************************************
 * ScreenList
 * ******************************************************************************************************************/

export type IsScreen<T> = T extends undefined
  ? 'true'
  : {[K in keyof T & string]: FirstLetter<K> extends UpperLetter ? never : 'true'}[keyof T & string];
type AllStackScreens<T> = {[K in keyof T]: IsScreen<T[K]> extends never ? K | AllStackScreens<T[K]> : K}[keyof T];
type StackValue<T, TK> = {
  [K in keyof T & string]: K extends TK
    ? IsScreen<T[K]> extends never
      ? undefined
      : T[K]
    : T[K] extends object
    ? StackValue<T[K], TK>
    : never;
}[keyof T & string];
type FlatStack<T, TK = AllStackScreens<T>> = {
  [K in TK & string]: IsScreen<StackValue<T, K>> extends never ? undefined : StackValue<T, K>;
};

export type ScreenList = FlatStack<RootScreenList>;

/********************************************************************************************************************
 * ScreenProps
 * ******************************************************************************************************************/

export type ScreenProps<T extends keyof ScreenList = any> = StackScreenProps<ScreenList, T>;

/********************************************************************************************************************
 * ScreenParentRouteName
 * ******************************************************************************************************************/

type GetScreenParentRouteName<
  T,
  ScreenName extends keyof ScreenList | undefined = undefined,
  A = {
    [K in keyof T]: IsScreen<T[K]> extends never
      ? GetScreenParentRouteName<T[K], ScreenName> extends never
        ? ScreenName extends undefined
          ? K
          : ScreenName extends keyof T[K]
          ? K
          : never
        : GetScreenParentRouteName<T[K], ScreenName>
      : never;
  },
> = A[keyof A];

export type ScreenParentRouteName<ScreenName extends keyof ScreenList | undefined = undefined> =
  GetScreenParentRouteName<RootScreenList, ScreenName>;
