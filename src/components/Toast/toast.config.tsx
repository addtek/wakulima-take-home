import React from 'react';
import {hasNotch} from 'react-native-device-info';

import {ToastConfig, ErrorToastProps} from './toast.types';

import {Toast} from './ToastWidget/toast';

export const defaultToastConfig: ToastConfig = {
  type: 'info',
  position: 'top',
  text1: 'CampusOptics',
  text2: 'Greetings from CampusOptics',
  visibilityTime: 5000,
  autoHide: true,
  topOffset: hasNotch() ? 50 : 30,
  bottomOffset: 40,
  props: {},
  onShow: () => null,
  onHide: () => null,
  onPress: () => null,
};

export const toastConfig = {
  error({text1, text2}: ErrorToastProps): React.ReactElement {
    return <Toast header={text1} message={text2} />;
  },
};
