import React from 'react';
import {View, StatusBar, StyleSheet, OpaqueColorValue} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'src/theme/colors';

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: AppColors.White,
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: AppColors.Gray200,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.White,
  },
});
interface SafeAreaProps {
  bottomBarColor: string | OpaqueColorValue | undefined;
  statusBarStyle:
    | 'default'
    | 'light-content'
    | 'dark-content'
    | null
    | undefined;
  statusBarColor?: string | OpaqueColorValue | undefined;
  children?: React.ReactNode;
}
const SafeArea = ({
  bottomBarColor,
  statusBarStyle,
  statusBarColor,
  children,
}: SafeAreaProps) => {
  return (
    <>
      <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={[
          styles.safeAreaBottom,
          {
            backgroundColor: bottomBarColor ? bottomBarColor : AppColors.White,
          },
        ]}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </>
  );
};
export default SafeArea;
