import {StyleSheet} from 'react-native';
import {AppColors} from 'src/theme';

export default StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 5,
  },
  row: {
    width: '100%',
  },
  tabsLabel: {
    padding: 10,
    borderBottomColor: AppColors.Gray500,
    borderBottomWidth: 2,
    minWidth: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsLabelText: {
    fontSize: 14,
    fontWeight: '400',
    color: AppColors.Black,
  },
  active: {
    borderBottomColor: AppColors.ThemeGreen,
  },
  activeText: {
    color: AppColors.ThemeGreen,
  },
  tabContent: {
    paddingVertical: 35,
  },
});
