import {
  StackActions,
  CommonActions,
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';

class Navigator {
  navigator: NavigationContainerRef<any> | null = null;

  setNavigator = (navigatorInstance: NavigationContainerRef<any>): void => {
    this.navigator = navigatorInstance;
  };

  isMounted = (): boolean => Boolean(this.navigator);

  dispatch = (action: any): void => {
    this.navigator?.dispatch(action);
  };
  canGoBack = (): boolean => {
    return this.navigator !== null && this.navigator.canGoBack();
  };

  navigate = (screenName: string, params: any): void =>
    this.dispatch(CommonActions.navigate({name: screenName, params}));

  push = (screenName: string, params: any): void => {
    this.dispatch(StackActions.push(screenName, params));
  };
  pushReset = (screenName: string, params: any): void => {
    const navState = this.navigator?.getRootState() ?? {routes: []};
    if (navState.routes.length > 1) {
      this.navigator?.dispatch((state: NavigationState) =>
        StackActions.pop(state.routes.length - 1),
      );
    }
    this.dispatch(StackActions.push(screenName, params));
  };
  replace = (screenName: string, params: any): void => {
    this.dispatch(StackActions.replace(screenName, params));
  };
  reset = (screenName: string, params: any): void =>
    this.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screenName, params}],
      }),
    );
}

export default Navigator;
