import React from 'react';
import {View, StyleSheet} from 'react-native';

import {ListIconProps} from './types';

import {Icon} from 'src/components/Icon';

export const ListIcon = ({
  iconType,
  fill,
  color,
  height,
  width,
  marginRight,
  innerHeight,
  innerWidth,
  testID,
}: ListIconProps): React.ReactElement => {
  return (
    <View
      testID={testID}
      style={{
        alignSelf: 'center',
        height: height != undefined ? height : 35,
        width: width != undefined ? width : 35,
        marginRight: marginRight ?? 10,
        marginTop: 5, // not sure why i need this to get the icons centerd
      }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: fill,
          borderRadius: 19,
          opacity: 0.15,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {iconType && (
          <Icon
            iconType={iconType}
            fill={fill}
            height={
              innerHeight != undefined
                ? innerHeight
                : height != undefined
                ? height / 2
                : 35 / 2
            }
            width={
              innerWidth != undefined
                ? innerWidth
                : width != undefined
                ? width / 2
                : 35 / 2
            }
            color={color}
          />
        )}
      </View>
    </View>
  );
};

//Usage
// import { ListIcon } from 'src/components/ListIcon/ListIcon'

// Paste element and properties
/* <ListIcon iconType={AppIcons.userCircle} fill={AppColors.Blue500} /> */
