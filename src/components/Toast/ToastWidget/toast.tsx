import React from 'react';
import {View} from 'react-native';

import {styles} from './toast.styles';
import {ToastProps} from './toast.types';

import {AppText} from 'src/components/AppText';
import {ListIcon} from 'src/components/ListIcon/ListIcon';
import {AppIcons} from 'src/components/Icon';
import {AppColors} from 'src/theme';

export const Toast = ({header, message}: ToastProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <ListIcon
        testID="icon"
        iconType={AppIcons.infoCircle}
        fill={'transparent'}
        color={AppColors.Yellow}
      />

      <View style={styles.textContainer}>
        <AppText style={styles.headerText}>{header}</AppText>
        <AppText style={styles.messageText}>{message}</AppText>
      </View>
    </View>
  );
};
