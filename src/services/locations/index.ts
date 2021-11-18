import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

const requestOrUseLocationPermissionsIOS = async (): Promise<boolean> => {
  const status = await Geolocation.requestAuthorization('whenInUse');

  return status === 'granted';
};

const requestOrUseLocationPermissionsAndroid = async (): Promise<boolean> => {
  const permissionString = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const hasPermission = await PermissionsAndroid.check(permissionString);

  if (hasPermission) {
    return hasPermission;
  } else {
    const status = await PermissionsAndroid.request(permissionString);

    return status === PermissionsAndroid.RESULTS.GRANTED;
  }
};

const requestOrUseLocationPermissions = async () => {
  if (Platform.OS === 'ios') {
    return requestOrUseLocationPermissionsIOS();
  } else if (Platform.OS === 'android') {
    return requestOrUseLocationPermissionsAndroid();
  }
};

export const getCurrentPosition = async (
  callback: (value: GeoCoordinates) => void,
  failureCallback?: (e?: any) => void,
): Promise<void> => {
  const permissionsGranted = await requestOrUseLocationPermissions();

  if (permissionsGranted) {
    Geolocation.getCurrentPosition(
      ({coords}) => callback(coords),
      // eslint-disable-next-line no-console
      e => {
        if (failureCallback) {
          failureCallback(e);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 3600000,
      },
    );
  } else if (failureCallback) {
    failureCallback();
  }
};
export const listenToLocationChanges = async (
  callback: (value: GeoCoordinates) => void,
  failureCallback?: (e?: any) => void,
): Promise<number | void> => {
  const permissionsGranted = await requestOrUseLocationPermissions();

  if (permissionsGranted) {
    return Geolocation.watchPosition(
      ({coords}) => callback(coords),
      e => {
        if (failureCallback) {
          failureCallback(e);
        }
      },
      {
        enableHighAccuracy: true,
        interval: 2000,
        showsBackgroundLocationIndicator: true,
      },
    );
  } else if (failureCallback) {
    failureCallback();
  }
};
export const stopListeningToLocationChanges = () => Geolocation.stopObserving();
