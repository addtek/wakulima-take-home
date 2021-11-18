import Toast from 'react-native-toast-message';

import {ToastConfig} from './toast.types';
import {defaultToastConfig} from './toast.config';

export const showToast = (additionalConfig?: ToastConfig): void => {
  Toast.show({...defaultToastConfig, ...additionalConfig});
};
