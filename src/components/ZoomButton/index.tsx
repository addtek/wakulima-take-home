import React from 'react';
import {Image} from 'native-base';
import {Images} from 'src/theme';
import {ActionButton} from 'src/components/ActionButton';
import {ViewStyle} from 'react-native';

type ZoomButtonProps = {
  onPress: () => void;
  color: string;
  style: ViewStyle;
};

const ZoomButton = (props: ZoomButtonProps) => {
  const {onPress, color, style} = props;

  return (
    <ActionButton
      styles={style}
      onPress={onPress}
      child={
        <Image
          source={Images.location}
          size={25}
          alt="location button"
          color={color}
          style={{width: 25, height: 25}}
        />
      }
    />
  );
};

export default ZoomButton;
