import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {AppColors} from 'src/theme/colors';

export interface LoadingIndicatorProps {
  size?: number | 'small' | 'large';
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: AppColors.TransparentWhiteBackground,
    justifyContent: 'center',
  },
  indicator: {width: 15, height: 15, alignSelf: 'center'},
});
export const LoadingIndicator = ({
  size,
}: LoadingIndicatorProps): React.ReactElement => (
  <View style={styles.container}>
    <View style={styles.indicator}>
      <ActivityIndicator
        testID="activity-indicator"
        color={AppColors.Blue300}
        size={size ?? 'large'}
      />
    </View>
  </View>
);
