import {StackNavigationProp} from '@react-navigation/stack';
import {RootScreenList, ScreenList} from '@types';

type OptionalParam = {$$Optional$$?: true};

type KeyOfScreenList = keyof ScreenList;

type OptionalParamValueKeyOfScreenList<A = {[K in KeyOfScreenList]: ScreenList[K] extends OptionalParam ? K : never}> =
  A[keyof A];

type NoParamValueKeyOfScreenList<A = {[K in KeyOfScreenList]: ScreenList[K] extends undefined ? K : never}> =
  A[keyof A];

type ParamValueKeyOfScreenList<
  A = {
    [K in KeyOfScreenList]: ScreenList[K] extends undefined ? never : ScreenList[K] extends OptionalParam ? never : K;
  },
> = A[keyof A];

type ArrayKeyOfScreenList = (
  | OptionalParamValueKeyOfScreenList
  | NoParamValueKeyOfScreenList
  | {[K in ParamValueKeyOfScreenList]?: ScreenList[K]}
)[];

function navigate<ScreenNames extends ArrayKeyOfScreenList>(
  navigation: StackNavigationProp<any>,
  screenNames: ScreenNames,
): void;
function navigate<NPScreenName extends OptionalParamValueKeyOfScreenList | NoParamValueKeyOfScreenList>(
  navigation: StackNavigationProp<any>,
  screenName: NPScreenName,
): void;
function navigate<PScreenName extends OptionalParamValueKeyOfScreenList | ParamValueKeyOfScreenList>(
  navigation: StackNavigationProp<any>,
  screenName: PScreenName,
  param: ScreenList[PScreenName],
): void;
function navigate<PScreenName extends OptionalParamValueKeyOfScreenList | ParamValueKeyOfScreenList>(
  navigation: StackNavigationProp<any>,
  parentScreenNames: ArrayKeyOfScreenList,
  screenName: PScreenName,
  param: ScreenList[PScreenName],
): void;
function navigate<PScreenName extends OptionalParamValueKeyOfScreenList | ParamValueKeyOfScreenList>(
  navigation: StackNavigationProp<any>,
  pScreenNameOrParentScreenNames: string | (string | Dict)[],
  pScreenNameOrParam?: PScreenName | string | Dict,
  pParam?: string | Dict,
): void {
  const screenNameList: (string | Dict)[] = [];
  if (pParam !== undefined) {
    if (Array.isArray(pScreenNameOrParentScreenNames)) {
      // navigate(navigation, parentScreenList, screen, param)
      const [firstItem, ...others] = pScreenNameOrParentScreenNames;
      navigate(navigation, firstItem as any);
      nextTick(() => {
        if (notEmpty(others)) {
          navigate(navigation, others as any, pScreenNameOrParam as any, pParam);
        } else {
          navigate(navigation, pScreenNameOrParam as any, pParam);
        }
      });
    } else {
      // navigate(navigation, parentScreen, screen, param)
      navigate(navigation, pScreenNameOrParentScreenNames as any);
      nextTick(() => {
        navigate(navigation, pScreenNameOrParam as any, pParam);
      });
    }
    return;
  } else if (pScreenNameOrParam !== undefined) {
    // navigate(navigation, screen, param)
    if (pScreenNameOrParam && typeof pScreenNameOrParam === 'object') {
      const item: Dict = {};
      item[pScreenNameOrParentScreenNames as string] = pScreenNameOrParam;
      screenNameList.push(item);
    } else {
      screenNameList.push(pScreenNameOrParentScreenNames);
    }
  } else if (Array.isArray(pScreenNameOrParentScreenNames)) {
    // navigate(navigation, screenList)
    const [firstItem, ...others] = pScreenNameOrParentScreenNames;
    navigate(navigation, firstItem as any);
    if (notEmpty(others)) {
      nextTick(() => {
        navigate(navigation, others as any);
      });
    }
    return;
  } else {
    // navigate(navigation, screen)
    screenNameList.push(pScreenNameOrParentScreenNames);
  }

  const screenNameItem = screenNameList[screenNameList.length - 1];
  let screenName: string;
  let params: Dict | undefined;

  if (typeof screenNameItem === 'string') {
    screenName = screenNameItem;
  } else {
    screenName = Object.keys(screenNameItem)[0];
    params = Object.values(screenNameItem)[0];
  }

  const screenNames = screenNameList.map((sn) => {
    if (typeof sn === 'string') {
      return sn;
    } else {
      return Object.keys(sn)[0];
    }
  });
  const checkScreenNamePathList = [screenNames.join('>')];

  if (screenNames.length === 1) {
    const parentState = navigation.getParent()?.getState();
    if (parentState) {
      checkScreenNamePathList.unshift(`${parentState.routes[parentState.index].name}>${screenName}`);
    }
  }

  const findScreen = (
    parent: Dict<Dict | undefined>,
    name: string,
    checkScreenNamePath: string,
    foundScreenNamePath: string[],
    paths: string[] = [],
  ) => {
    const parentKeys = Object.keys(parent);
    if (parentKeys.indexOf(name) > -1) {
      paths.push(name);
      if (paths.join('>').includes(checkScreenNamePath)) {
        foundScreenNamePath.push(...paths);
        return true;
      }
    } else {
      return !!parentKeys.find((pName) => {
        if (parent[pName]) {
          if (
            findScreen(parent[pName] as Dict<Dict | undefined>, name, checkScreenNamePath, foundScreenNamePath, [
              ...paths,
              pName,
            ])
          ) {
            return true;
          }
        }
      });
    }
  };

  type RouteItem = {screen: string; params?: Record<string, any>};

  const findAndGo = (checkScreenNamePath: string) => {
    const foundScreenNamePath: string[] = [];
    findScreen(RootScreenList, screenName, checkScreenNamePath, foundScreenNamePath);
    if (notEmpty(foundScreenNamePath)) {
      let item = foundScreenNamePath.pop();
      let routes: RouteItem | undefined;

      while (item) {
        if (item === screenName) {
          routes = {screen: item, params};
        } else if (routes) {
          routes = {screen: item, params: routes};
        }
        item = foundScreenNamePath.pop();
      }

      type Params = {screen?: string; params?: Params};
      const screenList: {screen?: string; params?: Dict}[] = [{screen: 'Root'}];
      const makeScreenList = (parent: Params) => {
        if (parent.params?.screen) {
          screenList.push({screen: parent.screen});
          makeScreenList(parent.params);
        } else {
          screenList.push(parent);
        }
      };
      makeScreenList(routes as Params);

      let data: Dict = {};
      for (let i = screenList.length - 1; i >= 0; i -= 1) {
        const screenItem = screenList[i];
        if (i === screenList.length - 1) {
          data.screen = screenItem.screen;
          data.params = screenItem.params;
        } else {
          if (screenItem.screen === 'Root') {
            navigation.navigate('Root', data);
          } else {
            data = {screen: screenItem.screen, params: data};
          }
        }
      }

      return true;
    }

    return false;
  };

  checkScreenNamePathList.find((checkScreenNamePath) => findAndGo(checkScreenNamePath));
}

export default navigate;
