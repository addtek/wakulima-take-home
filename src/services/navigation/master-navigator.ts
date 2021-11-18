import Navigator from './navigator';

export const {
  push,
  setNavigator: setMasterNavigator,
  navigate: navigateMasterScreen,
  replace: replaceMasterScreen,
  reset: resetMasterScreen,
  dispatch: navigationDispatch,
  canGoBack,
} = new Navigator();
