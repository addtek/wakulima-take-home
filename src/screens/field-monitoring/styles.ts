import {StyleSheet} from 'react-native';
import {AppColors} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  heading: {
    width: '100%',
    padding: 20,
  },
  headingRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    backgroundColor: 'transparent',
  },
  overlayTop: {
    position: 'absolute',
    top: 10,
    width: '100%',
    backgroundColor: 'transparent',
  },
  topText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  bottomText: {
    color: AppColors.Gray300,
    alignSelf: 'center',
    textAlign: 'center',
  },
  calloutInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calloutIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    padding: 10,
    marginVertical: 13,
  },
  calloutText: {
    flexShrink: 1,
    paddingRight: 5,
    maxWidth: 300,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: AppColors.White,
    padding: 15,
  },
  overlayItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  overlayText: {color: '#fff', fontSize: 17},
  mapViewOverlay: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  mapPaginationDesc: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    padding: 10,
  },
  recordActions: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
  },
  recordAction: {
    backgroundColor: AppColors.White,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordingStateButton: {
    width: 'auto',
    backgroundColor: AppColors.Red200,
    height: 50,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  whiteText: {
    color: AppColors.White,
  },
  sizeDateRow: {
    paddingLeft: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  sizeAndDateContainer: {
    borderRadius: 20,
    backgroundColor: AppColors.White,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: 10,
  },
  inputContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: AppColors.White,
    minHeight: '80%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    position: 'relative',
  },
  button: {flex: 1, height: 50, borderRadius: 5},
  left: {
    backgroundColor: AppColors.Red200,
    marginRight: 10,
  },
  right: {
    backgroundColor: AppColors.ThemeGreen,
    marginLeft: 10,
  },
  input: {
    fontSize: 14,
    marginBottom: 20,
    width: '100%',
  },
  flex2: {
    flex: 2,
  },
  flex1: {
    flex: 1,
    marginLeft: 20,
  },
  dragIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: AppColors.Gray800,
  },
  marginBottom: {
    marginBottom: 66,
  },
  farmName: {
    color: AppColors.Black,
    fontSize: 15,
    fontWeight: '700',
  },
});
