import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import styles from '../FarmListView/styles';
import {AppText} from 'src/components/AppText';
import {FarmData} from 'src/types/farm-field-data';

interface FarmFieldRowProps {
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
  onPress: (id: number) => void;
  isSelected: boolean;
  farmField: FarmData;
}
export const FarmFieldRow = ({
  onSelect,
  onPress,
  isSelected,
  farmField,
  onRemove,
}: FarmFieldRowProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(farmField.id)}
      onLongPress={() =>
        isSelected ? onRemove(farmField.id) : onSelect(farmField.id)
      }>
      <View style={[styles.tableRow, isSelected && styles.selectedRow]}>
        <View style={styles.tableIdCell}>
          <AppText style={styles.idText}>{farmField.uuid}</AppText>
        </View>
        <View style={styles.tableLabelCell}>
          <AppText>{farmField.label}</AppText>
        </View>
        <View style={styles.tableSizeCell}>
          <AppText>
            {farmField.size} {farmField.sizeUnit}
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
