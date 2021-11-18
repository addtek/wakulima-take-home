import React from 'react';
import {View} from 'react-native';
import styles from './styles';

export const Separator = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return <View style={[styles.separator, {width, height}]} />;
};
