import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  SafeAreaView,
  ViewStyle,
} from 'react-native';
import {AppIcons, Icon} from 'src/components/Icon';
import defaultStyles from './styles';

interface CustomBackButtonProps {
  onPress: () => void;
  styles?: ViewStyle;
}
const CustomBackButton = ({onPress, styles}: CustomBackButtonProps) => {
  const button = (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles ?? defaultStyles.container}>
        <Icon iconType={AppIcons.backIcon} width={32} height={32} />
      </View>
    </TouchableNativeFeedback>
  );
  return styles ? button : <SafeAreaView>{button}</SafeAreaView>;
};

export default CustomBackButton;
