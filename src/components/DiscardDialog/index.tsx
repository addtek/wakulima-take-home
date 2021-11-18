import BottomSheet from '@gorhom/bottom-sheet';
import {View} from 'react-native';
import {styles} from 'src/screens/register-farm/styles';
import {AppText} from 'src/components/AppText';
import {Button} from 'native-base';

import React, {useMemo, useRef} from 'react';
import {AppColors} from 'src/theme';
type DiscardDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

export const useDiscardDialog = ({
  onConfirm,
  onCancel,
  message,
}: DiscardDialogProps) => {
  // variables
  const snapPoints = useMemo(() => ['25%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const closeSheet = () => {
    bottomSheetRef.current?.close();
  };
  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const Dialog = () => (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={[
        styles.dragIndicator,
        {width: '50%', backgroundColor: AppColors.Gray500},
      ]}>
      <View>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: AppColors.White,
            flexDirection: 'row',
            marginBottom: 12,
            paddingTop: 20,
          }}>
          <View
            style={[
              styles.inputContainer,
              {justifyContent: 'space-between', width: '100%'},
            ]}>
            <View style={styles.flex}>
              <AppText style={{fontSize: 17, color: AppColors.Black}}>
                {message}
              </AppText>
            </View>
            <View style={styles.flex}>
              <Button
                colorScheme="secondary"
                size="sm"
                onPress={onCancel}
                style={[styles.button, styles.left]}>
                Yes, Got it!
              </Button>
              <Button onPress={onConfirm} style={[styles.button, styles.right]}>
                No, Keep on!
              </Button>
            </View>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
  return {
    closeSheet,
    openSheet,
    Dialog,
  };
};
