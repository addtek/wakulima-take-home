import {ViewProps} from 'react-native';

export interface AppInternetStatusViewProps extends ViewProps {
  textToDisplayOffline?: string;
  textToDisplayOnline?: string;
  height?: number;
}
