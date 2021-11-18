import {StyleSheet} from 'react-native';
import {AppColors} from 'src/theme';
import {FontWeights} from 'src/theme/typography';

export default StyleSheet.create({
  toolbar: {
    paddingTop: 27,
    paddingHorizontal: 25,
  },
  toolbarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  farmFieldListContainer: {
    paddingHorizontal: 25,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 5,
  },
  menuItemLabel: {
    marginHorizontal: 10,
  },
  menuContainer: {
    padding: 10,
  },
  toolbarTitle: {
    fontSize: 16,
    color: AppColors.Black,
    // @ts-ignore
    fontWeight: FontWeights.base,
  },
  buttonStyle: {
    width: 15,
  },
  tableHeading: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tableHeadingCell: {},
  tableIdCell: {
    flex: 1.5,
  },
  tableLabelCell: {
    flex: 4,
  },
  tableSizeCell: {
    flex: 2,
  },
  tableRow: {
    backgroundColor: AppColors.ThemeGreen900,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 4,
    minHeight: 50,
  },
  idText: {
    color: AppColors.ThemeGreen,
    fontSize: 13,
    // @ts-ignore
    fontWeight: FontWeights.semiBold,
  },
  selectedRow: {
    borderColor: AppColors.ThemeGreen,
    borderWidth: 2,
  },
});
