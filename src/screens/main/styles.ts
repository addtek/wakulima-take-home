import {StyleSheet} from 'react-native';
import {AppColors} from 'src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  overlayName: {
    fontSize: 24,
  },
  scrollContainerWrap: {
    flex: 1,
    backgroundColor: AppColors.White,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    height: '100%',
  },
  collapsedOvarlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 200,
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
  headerTitle: {
    textAlign: 'center',
    marginTop: 28,
  },
  bgImage: {width: '100%', height: '100%', paddingTop: 20},
  checkInButton: {
    backgroundColor: AppColors.ThemeGreen,
    borderRadius: 40,
    height: 34,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    flex: 1,
    backgroundColor: AppColors.White,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  checkInButtonLabel: {color: AppColors.White},
  profileActions: {paddingHorizontal: 20, paddingVertical: 15, flex: 1},
  paddingHorizontal: {paddingHorizontal: 20, flex: 1},
  paddingVertical: {paddingVertical: 15, flex: 1},
  vendorAddressWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendorAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  vendorAddress: {
    paddingLeft: 5,
    fontSize: 13,
  },
  vendorStatus: {color: AppColors.ThemeGreen, fontSize: 18, fontWeight: '700'},
  disclosureIcon: {color: AppColors.ThemeGreen, fontSize: 15, width: 14},
  happyHour: {fontSize: 18, fontWeight: '700'},
  paddingBottom: {paddingBottom: 10},
  seeAll: {fontSize: 12, fontWeight: '700'},
  happyHoursList: {paddingVertical: 20},
  happyHourItem: {flexDirection: 'row', paddingVertical: 10},
  happyHourItemTextDay: {flex: 1, flexShrink: 1},
  happyHourItemTextTime: {
    flex: 3,
    paddingLeft: 20,
    flexDirection: 'row',
    flexShrink: 1,
  },
  floatingButtonWrap: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.5,
    justifyContent: 'center',
  },
  floatingButton: {
    backgroundColor: AppColors.ThemeGreen,
  },
});