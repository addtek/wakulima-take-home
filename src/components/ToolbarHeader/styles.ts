import {StyleSheet} from 'react-native';
import {AppColors} from 'src/theme';

export default StyleSheet.create({
  bgImage: {width: '100%', height: '100%'},
  heroHeaderTitle: {
    color: AppColors.White,
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
    textAlign: 'center',
  },
  header: {},
  overlay: {
    backgroundColor: 'rgba(43,127,104,0.89)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  titleText: {alignItems: 'center', justifyContent: 'center'},
});
