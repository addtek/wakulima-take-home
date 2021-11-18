import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export const isTablet = DeviceInfo.isTablet();
export const AssetsScreenCustomHeaderHeight = 130;
export const isIos = Platform.OS === 'ios';
