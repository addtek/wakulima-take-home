import {StyleSheet} from 'react-native';

import {AppColors} from 'src/theme/colors';

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
  },
  errorTextShow: {
    textAlign: 'center',
    color: '#ffffff',
  },
  errorTextContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: AppColors.Red500,
  },
  succesTextContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: AppColors.Green500,
  },
});
export default styles;
