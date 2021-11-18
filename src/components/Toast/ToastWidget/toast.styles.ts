import {StyleSheet} from 'react-native';

import {isTablet} from 'src/helpers/device';
import {AppColors} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: isTablet ? '80%' : '95%',
    backgroundColor: AppColors.Gray200,
    borderRadius: 10,
    padding: 10,
  },
  headerText: {
    color: AppColors.White,
    fontSize: 15,
    fontWeight: 'bold',
  },
  messageText: {color: AppColors.White, fontSize: 14},
  textContainer: {flex: 1, paddingVertical: 5},
});
