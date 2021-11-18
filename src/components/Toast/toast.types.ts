import {ToastPosition, AnyObject} from 'react-native-toast-message';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastConfig {
  type: ToastType;
  position?: ToastPosition;
  text1?: string;
  text2?: string;
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  props?: AnyObject;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
}

export interface ErrorToastProps {
  text1: string;
  text2: string;
}
