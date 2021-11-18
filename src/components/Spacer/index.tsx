import React from 'react';
import {View} from 'react-native';

export const Spacer = ({width, height}: {height?: number; width?: number}) => {
  return <View style={{height, width}} />;
};
