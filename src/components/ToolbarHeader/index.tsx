import React from 'react';
import {ImageBackground, View} from 'react-native';
import styles from './styles';
import {Images} from 'src/theme';
import {AppText} from 'src/components/AppText';
import {AppIcons, Icon} from 'src/components/Icon';
import {Spacer} from 'src/components/Spacer';

export const ToolbarHeader = ({
  headerHeight,
  screenWidth,
}: {
  headerHeight: number;
  screenWidth: number;
}) => {
  return (
    <View
      style={[
        styles.header,
        {
          height: headerHeight,
          width: screenWidth,
        },
      ]}>
      <ImageBackground source={Images.banner} style={styles.bgImage}>
        <View style={styles.overlay}>
          <View style={styles.image}>
            <Icon iconType={AppIcons.plant} width={100} height={54} />
            <Spacer height={40} />
            <AppText style={[styles.heroHeaderTitle]}>Wakulima</AppText>
            <Spacer height={40} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
