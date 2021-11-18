import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import styles from '../FarmListView/styles';
import {AppText} from 'components/AppText';
import {FarmFieldData} from 'types/farm-field-data';

interface FarmFieldRowProps {
  onSelect: (id: string) => void;
  onPress: (id: string) => void;
  isSelected: boolean;
  farmField: FarmFieldData;
}
export const FarmFieldRow = ({
  onSelect,
  onPress,
  isSelected,
  farmField,
}: FarmFieldRowProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(farmField.id)}
      onLongPress={() => onSelect(farmField.id)}>
      <View style={[styles.tableRow, isSelected && styles.selectedRow]}>
        <View style={styles.tableIdCell}>
          <AppText style={styles.idText}>#ID</AppText>
        </View>
        <View style={styles.tableLabelCell}>
          <AppText>Label</AppText>
        </View>
        <View style={styles.tableSizeCell}>
          <AppText>Size</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
