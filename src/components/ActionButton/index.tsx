import React from 'react';
import {TouchableNativeFeedback, View, ViewStyle} from 'react-native';
import defaultStyles from './styles';

export const ActionButton = ({
  onPress,
  child,
  styles,
}: {
  onPress: () => void;
  child: React.ReactNode;
  styles?: ViewStyle;
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[defaultStyles.container, styles]}>{child}</View>
    </TouchableNativeFeedback>
  );
};
